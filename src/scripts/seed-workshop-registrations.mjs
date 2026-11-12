import { createClient } from '@libsql/client'

const db = createClient({ url: 'file:payload.db' })

const DOCTOR_NAMES = [
  'Dr. Rajesh Sharma',
  'Dr. Meera Nambiar',
  'Dr. Alok Sen',
  'Dr. Priya Nair',
  'Dr. Vikram Malhotra',
  'Dr. Sunita Rao',
  'Dr. Sanjay Verma',
  'Dr. Arvind Kumar',
  'Dr. Sneha Kulkarni',
  'Dr. Rahul Deshmukh',
  'Dr. Pooja Mehta',
  'Dr. Anand Joshi',
  'Dr. Divya Pillai',
  'Dr. Suresh Iyer',
  'Dr. Kavita Nair',
  'Dr. Rohan Gupta',
  'Dr. Neha Kapoor',
  'Dr. Manish Tiwari',
  'Dr. Shruti Shah',
  'Dr. Varun Chopra',
  'Dr. Deepa Menon',
  'Dr. Karthik Raman',
  'Dr. Swati Joshi',
  'Dr. Sameer Khan',
  'Dr. Shalini Saxena',
  'Dr. Gaurav Bansal',
]

const HOSPITALS = [
  'Tata Memorial Hospital, Mumbai',
  'AIIMS, New Delhi',
  'Apollo Hospitals, Chennai',
  'Fortis Healthcare, Bengaluru',
  'Manipal Hospital, Hyderabad',
  'Christian Medical College, Vellore',
  'PGI Chandigarh',
  'Max Super Speciality Hospital, Delhi',
]

const WORKSHOPS_CONFIG = [
  {
    slug: 'larynx-workshop-microlaryngoscopy-laser-surgeries',
    title: 'Larynx Workshop: Microlaryngoscopy & Laser Surgeries',
    targetCount: 21, // 20 baseline + Tiyasa Saha = 21
    unitPrice: 53100,
    date: '2026-11-18',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'hemorrhage-live',
    title: 'High-Risk Maternal Hemorrhage & Critical Obstetric Care',
    targetCount: 24, // 23 baseline + Dr. Anita Sharma = 24
    unitPrice: 53100,
    date: '2026-11-18',
    time: '02:00 PM – 06:00 PM',
  },
  {
    slug: 'b-lynch-simulation',
    title: 'B-Lynch & Cho compression suture simulation',
    targetCount: 17,
    unitPrice: 21240,
    date: '2026-11-20',
    time: '10:00 AM – 02:00 PM',
  },
  {
    slug: 'rotem-teg-recorded',
    title: 'Point-of-care ROTEM/TEG guided resuscitation',
    targetCount: 9,
    unitPrice: 14160,
    date: 'On demand',
    time: 'Recorded',
  },
  {
    slug: 'hypertensive-audit',
    title: 'Hypertensive disorders: operative audit',
    targetCount: 12,
    unitPrice: 34220,
    date: '2026-11-22',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'fetal-ultrasound',
    title: 'Fetal medicine ultrasound masterclass',
    targetCount: 8,
    unitPrice: 31860,
    date: '2026-11-25',
    time: '09:00 AM – 05:00 PM',
  },
  {
    slug: 'gdm-pathway',
    title: 'Gestational diabetes management pathway',
    targetCount: 6,
    unitPrice: 17700,
    date: 'On demand',
    time: 'Recorded',
  },
  {
    slug: 'basic-3d-temporal-bone-dissection-workshop',
    title: 'Basic 3D Temporal Bone Dissection Workshop',
    targetCount: 21, // 20 baseline + Debjita Das = 21
    unitPrice: 66080,
    date: '2026-11-18',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'advanced-temporal-bone-dissection-workshop',
    title: 'Advanced Temporal Bone Dissection Workshop',
    targetCount: 20,
    unitPrice: 53100,
    date: '2026-11-19',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'cochlear-implant-surgery-workshop',
    title: 'Cochlear Implant Surgery Workshop',
    targetCount: 20,
    unitPrice: 53100,
    date: '2026-11-20',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'facial-nerve-workshop',
    title: 'Facial Nerve Dissection & Monitoring Workshop',
    targetCount: 20,
    unitPrice: 53100,
    date: '2026-11-21',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'tympanoplasty-workshop',
    title: 'Tympanoplasty & Ossiculoplasty Workshop',
    targetCount: 20,
    unitPrice: 53100,
    date: '2026-11-22',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'paranasal-sinuses-workshop',
    title: 'Endoscopic Sinus & Paranasal Workshop',
    targetCount: 20,
    unitPrice: 53100,
    date: '2026-11-23',
    time: '09:00 AM – 01:00 PM',
  },
  {
    slug: 'balloon-sinuplasty-eustachian-tube-dilatation-workshop',
    title: 'Balloon Sinuplasty & Eustachian Tube Dilatation',
    targetCount: 20,
    unitPrice: 53100,
    date: '2026-11-24',
    time: '09:00 AM – 01:00 PM',
  },
]

async function main() {
  console.log('Seeding baseline workshop registrations...')

  // Delete incomplete rows (where participant_name is NULL)
  await db.execute('DELETE FROM workshop_registrations WHERE participant_name IS NULL')

  for (const cfg of WORKSHOPS_CONFIG) {
    // Check existing confirmed registrations for this slug
    const existingRes = await db.execute({
      sql: 'SELECT id, participant_name, amount_paid FROM workshop_registrations WHERE workshop_slug = ? AND status = ?',
      args: [cfg.slug, 'confirmed'],
    })

    const currentCount = existingRes.rows.length
    const needed = Math.max(0, cfg.targetCount - currentCount)

    console.log(`[${cfg.slug}] existing confirmed: ${currentCount}, adding: ${needed}`)

    for (let i = 0; i < needed; i++) {
      const docName = DOCTOR_NAMES[(i + currentCount) % DOCTOR_NAMES.length]
      const email = `${docName.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.')}@hospital.org`
      const phone = `+91 98${Math.floor(10000000 + Math.random() * 89999999)}`
      const hospital = HOSPITALS[i % HOSPITALS.length]
      const regNum = `MCI-2026-${Math.floor(10000 + Math.random() * 89999)}`
      const ticketId = `EB-2026-${Math.floor(1000 + Math.random() * 8999)}`
      const payId = `pay_sim_base_${Date.now()}_${i}`
      const orderId = `order_sim_base_${Date.now()}_${i}`

      await db.execute({
        sql: `INSERT INTO workshop_registrations (
          workshop_slug, workshop_title, participant_name, participant_email, participant_phone,
          institution, medical_reg_number, country, selected_date, selected_time,
          amount_paid, razorpay_payment_id, razorpay_order_id, ticket_id, status,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', datetime('now'), datetime('now'))`,
        args: [
          cfg.slug,
          cfg.title,
          docName,
          email,
          phone,
          hospital,
          regNum,
          'India',
          cfg.date,
          cfg.time,
          cfg.unitPrice,
          payId,
          orderId,
          ticketId,
        ],
      })
    }

    // Now recalculate stats for this workshop
    const totalRegRes = await db.execute({
      sql: 'SELECT amount_paid FROM workshop_registrations WHERE workshop_slug = ? AND status = ?',
      args: [cfg.slug, 'confirmed'],
    })

    const finalCount = totalRegRes.rows.length
    let totalRevenue = 0
    for (const row of totalRegRes.rows) {
      const amt = Number(row.amount_paid)
      totalRevenue += amt > 0 ? amt : cfg.unitPrice
    }

    const regUsersStr = `${finalCount} users`
    const revStr = `₹${totalRevenue.toLocaleString('en-IN')}`

    await db.execute({
      sql: 'UPDATE workshop_details SET registered_users = ?, revenue_sample = ? WHERE slug = ?',
      args: [regUsersStr, revStr, cfg.slug],
    })

    console.log(`[${cfg.slug}] -> ${regUsersStr}, ${revStr}`)
  }

  console.log('Seeding completed successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
