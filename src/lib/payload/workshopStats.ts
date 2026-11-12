import type { Payload } from 'payload'

export function parseDayNumber(str: string): number | null {
  if (!str) return null
  const clean = String(str).trim()
  const parts = clean.split(/[-/.]/)
  if (parts.length === 3) {
    if (parts[0].length === 4) return parseInt(parts[2], 10) || null
    if (parts[2].length === 4) return parseInt(parts[0], 10) || null
  }
  const match = clean.match(/\b([1-9]|[12]\d|3[01])\b/)
  if (match) return parseInt(match[1], 10)
  const d = new Date(clean)
  if (!isNaN(d.getTime())) return d.getDate()
  return null
}

export function cleanTime(t: string): string {
  return String(t || '').replace(/CET|IST|UTC/gi, '').replace(/\s+/g, ' ').trim()
}

export function timesMatch(slotStart: string, slotEnd: string, regTime: string): boolean {
  if (!regTime) return false
  const rClean = cleanTime(regTime)
  const sStart = cleanTime(slotStart)
  const fullSlot = cleanTime(slotEnd ? `${slotStart} – ${slotEnd}` : slotStart)

  if (rClean === fullSlot || rClean === sStart) return true
  if (rClean.includes(sStart)) return true
  if (fullSlot.includes(rClean)) return true

  const matchR = rClean.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
  const matchS = sStart.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
  if (matchR && matchS) {
    const hourR = parseInt(matchR[1], 10)
    const hourS = parseInt(matchS[1], 10)
    const merR = (matchR[3] || '').toUpperCase()
    const merS = (matchS[3] || '').toUpperCase()
    if (hourR === hourS && (!merR || !merS || merR === merS)) return true
  }
  return false
}

export async function updateWorkshopStats(payload: Payload, workshopSlug: string) {
  if (!workshopSlug) return null

  try {
    // 1. Find the workshop details doc
    const wsRes = await payload.find({
      collection: 'workshop-details',
      where: { slug: { equals: workshopSlug } },
      limit: 1,
    })

    const workshop = wsRes.docs?.[0]
    if (!workshop) return null

    // 2. Query all confirmed registrations for this workshop slug
    const regRes = await payload.find({
      collection: 'workshop-registrations',
      where: {
        and: [
          { workshopSlug: { equals: workshopSlug } },
          { status: { equals: 'confirmed' } },
        ],
      },
      limit: 10000,
    })

    const count = regRes.totalDocs ?? regRes.docs.length

    // 3. Calculate pricing & revenue
    const priceINR = typeof workshop.priceINR === 'number' ? workshop.priceINR : 45000
    const gstPercent = typeof workshop.gstPercent === 'number' ? workshop.gstPercent : 18
    const unitTotal = priceINR + Math.round((priceINR * gstPercent) / 100)

    let totalRevenue = 0
    for (const reg of regRes.docs) {
      if (typeof reg.amountPaid === 'number' && reg.amountPaid > 0) {
        totalRevenue += reg.amountPaid
      } else {
        totalRevenue += unitTotal
      }
    }

    const registeredUsersStr = `${count} users`
    const revenueSampleStr = `₹${totalRevenue.toLocaleString('en-IN')}`

    // 4. Update dates and time slots registration counts per slot
    let updatedSlots = workshop.datesAndTimeSlots
    if (Array.isArray(updatedSlots) && updatedSlots.length > 0) {
      updatedSlots = updatedSlots.map((d: any) => {
        const slotDay = parseDayNumber(d.date)
        const slots = Array.isArray(d.slots)
          ? d.slots.map((s: any) => {
              const matchingCount = regRes.docs.filter((r: any) => {
                const rDate = String(r.selectedDate || '')
                const rDay = parseDayNumber(rDate)
                const dateMatch =
                  (slotDay !== null && rDay !== null && slotDay === rDay) ||
                  rDate.includes(d.date) ||
                  String(d.date).includes(rDate)

                const timeMatch = timesMatch(s.startTime, s.endTime, r.selectedTime)
                return dateMatch && timeMatch
              }).length

              return {
                ...s,
                registrationsCount: matchingCount,
              }
            })
          : []
        return { ...d, slots }
      })
    }

    // 5. Save updated stats to workshop-details
    await payload.update({
      collection: 'workshop-details',
      id: workshop.id,
      data: {
        registeredUsers: registeredUsersStr,
        revenueSample: revenueSampleStr,
        ...(updatedSlots ? { datesAndTimeSlots: updatedSlots } : {}),
      },
      context: { skipStatsUpdate: true },
    })

    return { count, totalRevenue, registeredUsersStr, revenueSampleStr }
  } catch (error) {
    console.error(`Error updating stats for workshop "${workshopSlug}":`, error)
    return null
  }
}
