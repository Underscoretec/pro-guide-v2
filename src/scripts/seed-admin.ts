import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'

// Ensure .env is loaded if running via CLI without preloaded env
function loadEnv() {
  const envFiles = ['.env.local', '.env']

  for (const file of envFiles) {
    const envPath = path.resolve(process.cwd(), file)
    if (!fs.existsSync(envPath)) continue

    if (typeof process.loadEnvFile === 'function') {
      try {
        process.loadEnvFile(envPath)
      } catch {
        // Fallback to manual parsing
      }
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
    } catch {
      // Ignore read errors
    }
  }
}

export async function seedAdmin() {
  loadEnv()

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD?.trim()
  const fullName =
    process.env.ADMIN_NAME?.trim() ||
    process.env.ADMIN_FULL_NAME?.trim() ||
    'System Administrator'

  if (!email || !password) {
    throw new Error(
      'Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables. Please check your .env file.',
    )
  }

  // Payload CMS requires a valid email format where the TLD consists only of letters (e.g. .com, .org, .in)
  const emailRegex = /^(?!.*\.\.)[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i
  if (!emailRegex.test(email)) {
    throw new Error(
      `Invalid email address format: "${email}".\n` +
      `Payload CMS requires a valid top-level domain with letters only (e.g. ".com", not ".com2").\n` +
      `If you intended to create a second user, use an address like "admin2@proguide.com" or "adminv2_2@proguide.com" in your .env file.`
    )
  }

  console.log('👤 Initializing Payload CMS to seed admin user...')
  const payload = await getPayload({ config })

  console.log(`🔍 Checking if admin user exists with email: ${email}`)
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
    limit: 1,
  })

  if (existingUsers.totalDocs > 0) {
    const existingAdmin = existingUsers.docs[0]
    console.log(`⚠️ User with email "${email}" already exists (ID: ${existingAdmin.id}). Updating credentials and role...`)

    await payload.update({
      collection: 'users',
      id: existingAdmin.id,
      data: {
        password,
        role: 'admin',
        fullName: existingAdmin.fullName || fullName,
        isEmailVerified: true,
        isPhoneVerified: true,
      },
    })

    console.log(`✅ Admin user "${email}" updated successfully with new password and admin privileges!`)
  } else {
    console.log(`➕ Creating new admin user: ${email}`)

    const newAdmin = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'admin',
        fullName,
        isEmailVerified: true,
        isPhoneVerified: true,
      },
    })

    console.log(`✅ Admin user "${newAdmin.email}" created successfully (ID: ${newAdmin.id})!`)
  }
}

// Allow direct CLI execution: tsx src/scripts/seed-admin.ts
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAdmin()
    .then(() => {
      console.log('🎉 Done!')
      process.exit(0)
    })
    .catch((err) => {
      console.error('❌ Error seeding admin user:', err)
      process.exit(1)
    })
}

