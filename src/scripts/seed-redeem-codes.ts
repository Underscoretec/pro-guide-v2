import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'

function loadEnv() {
  const envFiles = ['.env.local', '.env']

  for (const file of envFiles) {
    const envPath = path.resolve(process.cwd(), file)
    if (!fs.existsSync(envPath)) continue

    if (typeof process.loadEnvFile === 'function') {
      try {
        process.loadEnvFile(envPath)
      } catch {}
    }

    try {
      const content = fs.readFileSync(envPath, 'utf8')
      for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim()
          let val = trimmed.slice(eqIdx + 1).trim()
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1)
          }
          if (key && !process.env[key]) {
            process.env[key] = val
          }
        }
      }
    } catch {}
  }
}

export async function seedRedeemCodes() {
  loadEnv()
  const payload = await getPayload({ config })
  console.log('👤 Payload CMS initialized!')

  const existing = await payload.find({
    collection: 'redeem-codes',
    limit: 5,
  })

  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'redeem-codes',
      data: {
        code: 'AIIMS50',
        discountPercent: 50,
        allowedInstitute: 'AIIMS',
        isActive: true,
        notes: 'Sample 50% discount for AIIMS participants',
      },
    })

    await payload.create({
      collection: 'redeem-codes',
      data: {
        code: 'FREE100',
        discountPercent: 100,
        isActive: true,
        notes: 'Sample 100% full free registration waiver',
      },
    })

    await payload.create({
      collection: 'redeem-codes',
      data: {
        code: 'PROGUIDE20',
        discountPercent: 20,
        isActive: true,
        notes: 'Sample 20% general workshop coupon',
      },
    })
    console.log('✅ Sample redeem codes created successfully (AIIMS50, FREE100, PROGUIDE20)!')
  } else {
    console.log('ℹ️ Redeem codes already exist:', existing.docs.map((d: any) => d.code))
  }
}

seedRedeemCodes()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding redeem codes:', err)
    process.exit(1)
  })

