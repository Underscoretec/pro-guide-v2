import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, workshopSlug, institution } = body

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, message: 'Please enter a redeem code.' }, { status: 400 })
    }

    const cleanCode = code.toUpperCase().trim().replace(/\s+/g, '')
    const payload = await getPayloadClient()

    const results = await payload.find({
      collection: 'redeem-codes',
      where: {
        code: {
          equals: cleanCode,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    if (!results || results.totalDocs === 0) {
      return NextResponse.json({ valid: false, message: 'Invalid or expired redeem code.' }, { status: 404 })
    }

    const coupon = results.docs[0] as any

    // 1. Active check
    if (coupon.isActive === false) {
      return NextResponse.json({ valid: false, message: 'This redeem code is no longer active.' }, { status: 400 })
    }

    // 2. Expiry check
    if (coupon.expiresAt) {
      const expDate = new Date(coupon.expiresAt)
      if (expDate.getTime() < Date.now()) {
        return NextResponse.json({ valid: false, message: 'This redeem code has expired.' }, { status: 400 })
      }
    }

    // 3. Usage limit check
    if (typeof coupon.maxUses === 'number' && coupon.maxUses > 0) {
      const used = typeof coupon.usedCount === 'number' ? coupon.usedCount : 0
      if (used >= coupon.maxUses) {
        return NextResponse.json({ valid: false, message: 'This redeem code usage limit has been reached.' }, { status: 400 })
      }
    }

    // 4. Workshop applicability check
    if (Array.isArray(coupon.applicableWorkshops) && coupon.applicableWorkshops.length > 0 && workshopSlug) {
      const matchesWorkshop = coupon.applicableWorkshops.some((ws: any) => {
        if (!ws) return false
        if (typeof ws === 'string') return ws === workshopSlug
        return ws.slug === workshopSlug || ws.id === workshopSlug
      })
      if (!matchesWorkshop) {
        return NextResponse.json(
          { valid: false, message: 'This redeem code is not valid for this workshop.' },
          { status: 400 }
        )
      }
    }

    // 5. Allowed Institute check (if specified)
    if (coupon.allowedInstitute && typeof coupon.allowedInstitute === 'string' && coupon.allowedInstitute.trim()) {
      const reqInstitute = String(institution || '').trim().toLowerCase()
      const allowed = coupon.allowedInstitute.trim().toLowerCase()
      if (!reqInstitute || (!reqInstitute.includes(allowed) && !allowed.includes(reqInstitute))) {
        return NextResponse.json(
          {
            valid: false,
            message: `This redeem code is exclusively reserved for delegates from "${coupon.allowedInstitute}". Please specify your Institution / Hospital.`,
          },
          { status: 400 }
        )
      }
    }

    const discountPercent = typeof coupon.discountPercent === 'number' ? coupon.discountPercent : 50

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountPercent,
      message: `${discountPercent}% discount applied successfully!`,
    })
  } catch (error: any) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { valid: false, message: 'Could not validate coupon. Please try again.' },
      { status: 500 }
    )
  }
}

