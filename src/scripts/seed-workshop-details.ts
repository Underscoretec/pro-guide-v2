import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'
import { workshopSeedData } from './workshop-details-data'

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const envPath = path.resolve(process.cwd(), file)
    if (!fs.existsSync(envPath)) continue
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let val = trimmed.slice(eqIdx + 1).trim()
      if (/^(".*"|'.*')$/.test(val)) val = val.slice(1, -1)
      if (key && !process.env[key]) process.env[key] = val
    }
  }
}

const rows = (items: string[]) => items.map((text) => ({ text }))

export async function seedWorkshopDetails() {
  loadEnv()
  const payload = await getPayload({ config })

  for (const w of workshopSeedData) {
    const data = {
      title: w.title,
      slug: w.slug,
      subtitle: w.subtitle,
      category: w.category,
      imageUrl: w.imageUrl,
      duration: w.duration,
      learners: w.learners,
      designationBullets: rows(w.designationBullets),
      academicHeading: w.academicContent.heading,
      academicSubheadings: w.academicContent.subheadings.map((s) => ({
        title: s.title,
        bullets: rows(s.bullets),
      })),
      whyTrainBullets: rows(w.whyTrainBullets),
      experienceContent: rows(w.experienceContent),
      teachingPhilosophy: rows(w.teachingPhilosophy),
    }

    const existing = await payload.find({
      collection: 'workshop-details',
      where: { slug: { equals: w.slug } },
      limit: 1,
    })

    if (existing.docs.length) {
      console.log(`Skipping (already exists): ${w.slug}`)
      continue
    }
    await payload.create({ collection: 'workshop-details', data })
    console.log(`Created: ${w.slug}`)
  }
}

seedWorkshopDetails()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
