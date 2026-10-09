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

export async function seedProducts() {
  loadEnv()
  const payload = await getPayload({ config })

  console.log('Seeding / syncing products collection...')

  const existingProducts = await payload.find({
    collection: 'products',
    limit: 100,
  })

  // Check if products-page has customized items
  const pageRes = await payload.find({
    collection: 'products-page',
    limit: 1,
    depth: 2,
  })
  const pageDoc = pageRes.docs[0] as any
  let userCustomMastoid: any = null

  if (pageDoc?.families && Array.isArray(pageDoc.families)) {
    for (const f of pageDoc.families) {
      if (Array.isArray(f.items)) {
        for (const item of f.items) {
          if ((item.name || '').toLowerCase().includes('mastoid')) {
            userCustomMastoid = item
          }
        }
      }
    }
  }

  const catalogToSeed = [
    {
      name: userCustomMastoid?.name || 'Basic Model — Mastoid Bone',
      slug: 'tb',
      showOnLandingPage: true,
      badge: userCustomMastoid?.badge || 'Foundation',
      displayOrder: 1,
      price: userCustomMastoid?.price || 20000,
      familyId: 'otology',
      category: 'Otology — Artificial Temporal Bone Series',
      sku: 'PG-TB-001',
      shortDescription:
        userCustomMastoid?.description ||
        'Learn to hold the drill, identify the landmarks and open the mastoid safely — where everyone begins.',
      variant: 'Available in Left and Right variant',
      image: userCustomMastoid?.image?.id || (typeof userCustomMastoid?.image === 'number' ? userCustomMastoid.image : undefined),
      imageUrl: userCustomMastoid?.imageUrl || '/images/prod1.jpg',
      detailHeading: 'True-to-Life Otological Training',
      detailParagraph1:
        userCustomMastoid?.description ||
        'Cast from radiological micro-CT data, our 3D temporal bone replicates cellular mastoid architecture, pneumatization, dural plate, sigmoid sinus, and facial canal positions down to 0.1 mm precision.',
      detailParagraph2:
        'Allows trainees to drill with surgical cutting and diamond burrs, experience realistic vibration and bone resistance, and identify crucial landmarks safely.',
      lining: 'OSSA+ Composite™ Mineralized Bone Matrix.',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
      specifications: {
        weight: '240 g',
        dimensions: '11 × 9 × 8 cm',
        material: 'Mineral-filled bone composite with colored anatomical landmarks',
        variant: 'Left & Right available',
        compatibility: 'Standard surgical drills, irrigation, and operating microscopes',
      },
    },
    {
      name: 'Paranasal Model with Bassettes',
      slug: 'pnsb',
      showOnLandingPage: true,
      badge: 'Advanced',
      displayOrder: 2,
      price: 25000,
      familyId: 'rhinology',
      category: 'Rhinology — Paranasal Sinus (PNS) Series',
      sku: 'PG-PNS-002',
      shortDescription:
        'Complete sinonasal anatomy for endoscopic sinus surgery training — from uncinectomy through sphenoidotomy, under real instruments.',
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/prod2.jpg',
      detailHeading: 'Complete Sinonasal Surgical Station',
      detailParagraph1:
        'Engineered for comprehensive endoscopic sinus surgical workshops. From uncinectomy, maxillary antrostomy, ethmoidectomy to sphenoidotomy, delegates perform real steps under standard endoscopic visualization.',
      detailParagraph2:
        'Equipped with quick-release anatomical cassettes to enable fast resets between training sessions without discarding the base mounting hardware.',
      lining: 'OSSA+ Composite™ Bone Matrix & High-Durability Medical Polymer.',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
      specifications: {
        weight: '620 g',
        dimensions: '18 × 15 × 12 cm',
        material: 'OSSA+ Composite™ with reinforced workstation base',
        variant: 'Left & Right available',
        compatibility: 'Rigid endoscopes, curettes, punches, and microdebriders',
      },
    },
    {
      name: 'Paranasal Model without base',
      slug: 'pns',
      showOnLandingPage: true,
      badge: 'Task',
      displayOrder: 3,
      price: 20000,
      familyId: 'rhinology',
      category: 'Rhinology — Paranasal Sinus (PNS) Series',
      sku: 'PG-PNS-001',
      shortDescription:
        'Focused FESS steps in a repeatable, consumable format for early endoscopic skills and instrument navigation.',
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/prod3.jpg',
      detailHeading: 'Targeted Sinonasal Surgical Training',
      detailParagraph1:
        'Engineered for endoscopic sinus surgical dissection courses. Trainees navigate endoscopic cameras, locate natural ostia, and practice instrument coordination under realistic haptic conditions.',
      detailParagraph2:
        'Cast in authentic OSSA+ Composite™ replicating human bone and soft tissue resistance, providing authentic tactile feedback during uncinectomy and antrostomy.',
      lining: 'OSSA+ Composite™ Mineralized Bone Matrix & Soft Surgical Grade Silicone.',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
      specifications: {
        weight: '350 g',
        dimensions: '14 × 12 × 10 cm',
        material: 'OSSA+ Composite™ bone matrix & soft silicone',
        variant: 'Left & Right available',
        compatibility: 'Endoscopic sinus surgical instruments & microdebriders',
      },
    },
    {
      name: 'Artificial Larynx Model',
      slug: 'larynx',
      showOnLandingPage: true,
      badge: 'Family 04 · Laryngology',
      displayOrder: 4,
      price: 20000,
      familyId: 'laryngology-custom',
      category: 'Laryngology, Vestibular & Custom Series',
      sku: 'PG-LRX-001',
      shortDescription:
        'Laryngeal framework and airway anatomy for procedural demonstration, airway teaching and course use — with replaceable glottic cassettes for lesion work.',
      variant: 'Standard Adult Anatomical Scale',
      imageUrl: '/images/prod4.jpg',
      detailHeading: 'Microlaryngoscopy & Phonomicrosurgery Training',
      detailParagraph1:
        'Designed specifically for microlaryngoscopy suspension training and laser surgery. Trainees navigate suspension laryngoscopes, align microscope focal planes, and operate delicate micro-instruments in a restricted corridor.',
      detailParagraph2:
        'The cassette glottic insert incorporates life-like simulated vocal fold layers, permitting precise micro-flap elevation, subepithelial dissection, and pathology excision.',
      lining: 'Soft Surgical Silicone & Rigid Cartilaginous Framework Polymer.',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
      specifications: {
        weight: '480 g',
        dimensions: '16 × 13 × 11 cm',
        material: 'Anatomical polyurethane cartilage framework & silicone mucosa',
        variant: 'Adult scale with exchangeable pathology cassettes',
        compatibility: 'Suspension laryngoscopes, surgical microscopes, micro-instruments',
      },
    },
    {
      name: 'Advance Model — Complete Bone',
      slug: 'advance-model-complete-bone',
      showOnLandingPage: false,
      badge: 'Complete',
      displayOrder: 5,
      price: 20000,
      familyId: 'otology',
      category: 'Otology — Artificial Temporal Bone Series',
      sku: 'PG-TB-002',
      shortDescription:
        'The complete bone with middle and inner ear in place — for advanced surgeries and every exam that matters.',
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/detail_sigmoid.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
    {
      name: 'Cochlear Implant Model',
      slug: 'cochlear-implant-model',
      showOnLandingPage: false,
      badge: 'Advanced',
      displayOrder: 6,
      price: 20000,
      familyId: 'otology',
      category: 'Otology — Artificial Temporal Bone Series',
      sku: 'PG-TB-003',
      shortDescription:
        'Practise the delicate path to the cochlea and feel what a smooth electrode insertion should feel like — built for CI programmes and device training.',
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/detail_macro.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
    {
      name: 'Task-Based Trainers',
      slug: 'task-based-trainers',
      showOnLandingPage: false,
      badge: 'Task',
      displayOrder: 7,
      price: 20000,
      familyId: 'otology',
      category: 'Otology — Artificial Temporal Bone Series',
      sku: 'PG-TB-004',
      shortDescription:
        'One skill per model, priced like a textbook — repeat it until it feels easy.',
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/detail_middleear.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
    {
      name: 'Maxillary Balloon Sinuplasty Trainer',
      slug: 'maxillary-balloon-sinuplasty-trainer',
      showOnLandingPage: false,
      badge: 'Only from OSSA+',
      displayOrder: 8,
      price: 20000,
      familyId: 'balloon',
      category: 'Interventional Rhinology — Balloon Sinuplasty Series',
      sku: 'PG-BLN-001',
      shortDescription:
        'Ostium identification, catheter navigation and balloon placement under endoscopic view.',
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/detail_nose.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
    {
      name: 'Frontal Balloon Sinuplasty Trainer',
      slug: 'frontal-balloon-sinuplasty-trainer',
      showOnLandingPage: false,
      badge: 'Only from OSSA+',
      displayOrder: 9,
      price: 20000,
      familyId: 'balloon',
      category: 'Interventional Rhinology — Balloon Sinuplasty Series',
      sku: 'PG-BLN-002',
      shortDescription:
        'Practise the challenging frontal recess pathway with realistic anatomical curvature.',
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/prod3.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
    {
      name: 'Eustachian Tube Dilation Trainer',
      slug: 'eustachian-tube-dilation-trainer',
      showOnLandingPage: false,
      badge: 'Only from OSSA+',
      displayOrder: 10,
      price: 20000,
      familyId: 'balloon',
      category: 'Interventional Rhinology — Balloon Sinuplasty Series',
      sku: 'PG-BLN-003',
      shortDescription:
        "The world's first Eustachian tube balloon dilation trainer for clinic procedure rehearsal.",
      variant: 'Available in Left and Right variant',
      imageUrl: '/images/detail_middleear.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
    {
      name: 'Labyrinth Model for the Epley Maneuver',
      slug: 'labyrinth-model-epley-maneuver',
      showOnLandingPage: false,
      badge: 'Family 05 · Vestibular',
      displayOrder: 11,
      price: 20000,
      familyId: 'laryngology-custom',
      category: 'Laryngology, Vestibular & Custom Series',
      sku: 'PG-VST-001',
      shortDescription:
        'A functional semicircular-canal model demonstrating otoconia movement through each stage of repositioning — for ENT, neurology and physiotherapy teaching.',
      variant: 'Standard Anatomical Scale',
      imageUrl: '/images/detail_ear.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
    {
      name: 'Pathology Variants & Patient-Specific Models',
      slug: 'pathology-variants-patient-specific-models',
      showOnLandingPage: false,
      badge: 'Family 06 · Pathological & Custom',
      displayOrder: 12,
      price: 20000,
      familyId: 'laryngology-custom',
      category: 'Laryngology, Vestibular & Custom Series',
      sku: 'PG-CST-001',
      shortDescription:
        'Disease-state anatomy (cholesteatoma, sclerotic mastoid and more) at catalogue prices, and CT-to-model builds for rehearsing a specific patient’s surgery before you perform it.',
      variant: 'Custom Patient-Specific Variant',
      imageUrl: '/images/detail_larynxtop.jpg',
      primaryButtonText: 'Buy',
      secondaryButtonText: 'Enquire',
    },
  ]

  for (const item of catalogToSeed) {
    const existing = existingProducts.docs.find((p: any) => p.slug === item.slug)
    if (existing) {
      console.log(`Updating product "${item.name}" (${item.slug}) with familyId: ${item.familyId}...`)
      await payload.update({
        collection: 'products',
        id: existing.id,
        data: {
          familyId: item.familyId,
        } as any,
      })
    } else {
      console.log(`Creating product "${item.name}" (${item.slug})...`)
      await payload.create({
        collection: 'products',
        data: item as any,
      })
    }
  }

  console.log('Seeding / syncing completed successfully!')
  process.exit(0)
}

if (process.argv[1] && process.argv[1].includes('seed-products')) {
  seedProducts().catch((err) => {
    console.error('Seeding error:', err)
    process.exit(1)
  })
}
