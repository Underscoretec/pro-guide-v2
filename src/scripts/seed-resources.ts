import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'

function loadEnv() {
  const envFiles = ['.env.local', '.env']

  for (const file of envFiles) {
    const envPath = path.resolve(process.cwd(), file)
    if (!fs.existsSync(envPath)) continue

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

export async function seedResources() {
  loadEnv()
  const payload = await getPayload({ config })

  console.log('Seeding / syncing resources collection...')

  const existing = await payload.find({
    collection: 'resources',
    limit: 1,
  })

  const initialData = {
    title: 'Resource Library & PDF Catalogues',
    hero: {
      crumbHomeText: 'Home',
      crumbCategoryText: 'Resources',
      crumbCurrentText: 'Brochures & Catalogues',
      title: 'Resource Library & PDF Catalogues',
      description:
        "Access and download verified educational materials, curriculum modules, and technical brochures for ProGuide's Otolaryngology Head & Neck 3D simulation models and hands-on dissection workshops.",
      directPdfDownloadText: 'Direct PDF Download',
      directPdfDownloadLink: '/files/proguide-workshop-brochure-2026.pdf',
      instantViewerText: 'Instant In-Browser Viewer',
      instantViewerLink: '/files/proguide-master-catalogue.pdf',
    },
    filterTabs: [
      { label: 'All Documents (4)', key: 'all' },
      { label: 'Workshop Brochures', key: 'workshop' },
      { label: 'Product Catalogues', key: 'product' },
      { label: 'Clinical & Simulation Guides', key: 'clinical' },
    ],
    sectionHeader: {
      title: 'Official ProGuide Brochures & Documents',
      subtitle:
        'Review the comprehensive course itineraries, surgical dissection station setups, and complete product dimension tables.',
      downloadAllText: 'Download All Package (.zip)',
      downloadAllLink: '/files/proguide-workshop-brochure-2026.pdf',
    },
    documents: [
      {
        title: 'ProGuide 3D Hands-On Workshops 2026 Official Brochure',
        category: 'workshop',
        badgeText: 'WORKSHOP BROCHURE',
        badgeColor: 'orange',
        yearOrVol: 'Oct 2026',
        description:
          'Comprehensive programme itinerary for KBI SkillBridge dissection stations, surgical faculty profiles, and station logistics.',
        viewPdfText: 'View PDF',
        viewPdfLink: '/files/proguide-workshop-brochure-2026.pdf',
        downloadPdfText: 'Download PDF',
        downloadPdfLink: '/files/proguide-workshop-brochure-2026.pdf',
        spineBadgeTag: 'PDF',
        spineTitle: 'COURSE SYLLABUS & SPECS',
        spineBg: 'purple',
      },
      {
        title: 'ProGuide 3D Otolaryngology Simulation Models Master Catalogue',
        category: 'product',
        badgeText: 'PRODUCT CATALOGUE',
        badgeColor: 'purple',
        yearOrVol: 'Vol. IV (2026)',
        description:
          'Full specifications for high-fidelity Otology and Rhinology training models, composite material properties, and complete dimension tables.',
        viewPdfText: 'View PDF',
        viewPdfLink: '/files/proguide-master-catalogue.pdf',
        downloadPdfText: 'Download PDF',
        downloadPdfLink: '/files/proguide-master-catalogue.pdf',
        spineBadgeTag: '24 PAGES',
        spineTitle: 'MASTER CATALOG VOL. IV',
        spineBg: 'dark-purple',
      },
      {
        title: 'Temporal Bone Drilling Manual & Anatomical Landmark Guide',
        category: 'clinical',
        badgeText: 'CLINICAL GUIDE',
        badgeColor: 'green',
        yearOrVol: 'Surgical Lab Ed.',
        description:
          'Standard operating procedures and station drill protocols for mastoidectomy, facial nerve decompression, and labyrinthotomy.',
        viewPdfText: 'View PDF',
        viewPdfLink: '/files/temporal-bone-drilling-manual.pdf',
        downloadPdfText: 'Download PDF',
        downloadPdfLink: '/files/temporal-bone-drilling-manual.pdf',
        spineBadgeTag: '12 PAGES',
        spineTitle: 'SURGICAL LAB PROTOCOLS',
        spineBg: 'green',
      },
      {
        title: 'Custom Patient-Specific 3D Models Specification Sheet',
        category: 'product',
        badgeText: 'PRODUCT SPEC',
        badgeColor: 'purple',
        yearOrVol: 'Orders 2026',
        description:
          'Guidelines for hospital departments and skills labs to submit anonymized DICOM / CT datasets for patient-specific surgical model preparation.',
        viewPdfText: 'View PDF',
        viewPdfLink: '/files/custom-patient-model-specsheet.pdf',
        downloadPdfText: 'Download PDF',
        downloadPdfLink: '/files/custom-patient-model-specsheet.pdf',
        spineBadgeTag: '8 PAGES',
        spineTitle: 'DICOM / CT SPECIFICATIONS',
        spineBg: 'orange',
      },
    ],
    ctaBanner: {
      title: 'Require Institutional Course Packages or Printed Physical Catalogues?',
      subtitle:
        'ProGuide coordinates with ENT departments, teaching hospitals, and surgical skill labs worldwide to provide customized bulk models, workshop facilitation kits, and printed course syllabi.',
      primaryBtnText: 'Request Call Back',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'Email Programme Co-ordinator',
      secondaryBtnLink: 'mailto:info@pro-guide.in',
    },
  }

  if (existing.docs.length > 0) {
    console.log('Updating existing resources document...')
    await payload.update({
      collection: 'resources',
      id: existing.docs[0].id,
      data: initialData as any,
    })
  } else {
    console.log('Creating initial resources document...')
    await payload.create({
      collection: 'resources',
      data: initialData as any,
    })
  }

  console.log('Successfully seeded resources collection!')
}

if (process.argv[1]?.includes('seed-resources.ts')) {
  seedResources()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error seeding resources:', err)
      process.exit(1)
    })
}
