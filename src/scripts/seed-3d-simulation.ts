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

export async function seedThreeDSimulation() {
  loadEnv()
  const payload = await getPayload({ config })

  console.log('Seeding / syncing 3d-simulation collection...')

  const existing = await payload.find({
    collection: '3d-simulation' as any,
    limit: 1,
  })

  const threeDSimulationData = {
    title: '3D Simulation Page',
    sections: [
      {
        blockType: 'resources-hero' as const,
        crumbHomeText: 'Home',
        crumbCurrentText: '3D Simulation',
        title: 'Why 3D Simulation Models',
        description:
          "Everything surgeons ask us about the models — why they work, what they're made of, and every procedure that can be performed on them.",
      },
      {
        blockType: 'why-simulation' as const,
        title: 'Why 3D Simulation Models',
        points: [
          {
            num: '01',
            text: 'Anatomy of the temporal bone and paranasal sinuses mandates attaining proper skills before venturing for surgical procedures.',
          },
          {
            num: '02',
            text: 'Though cadaveric dissection is ideal, 3D simulation models offer a practical alternative when cadaveric bones are unavailable or limited.',
          },
          {
            num: '03',
            text: 'Artificial temporal bones replicate internal and external anatomy, enabling mastoid, facial nerve and cochlear implant practice.',
          },
          {
            num: '04',
            text: '3D sinus models offer 90%+ anatomical accuracy, replicating ethmoid cells, turbinates, sphenoid, uncinate process and bulla.',
          },
        ],
      },
      {
        blockType: 'model-features' as const,
        title: '3D Simulation Bone Model Features',
        features: [
          { num: '01', text: 'No need for chemical preservations' },
          { num: '02', text: 'Bone-similar and soft tissue like material' },
          { num: '03', text: '14/12/4 surgeries can be practiced on temporal, sinus and larynx models respectively' },
          { num: '04', text: 'Made with eco-friendly material' },
          { num: '05', text: 'Models of disease pathology available' },
        ],
      },
      {
        blockType: 'temporal-bone-procedures' as const,
        title: 'Procedures That Can Be Performed Using the Temporal Bone Model',
        procedures: [
          { name: 'Cortical Mastoidectomy' },
          { name: 'Posterior Tympanotomy' },
          { name: 'Cochleostomy' },
          { name: 'Cochlear Implant Dummy Electrode Insertion' },
          { name: 'Labyrinthectomy' },
          { name: 'Facial Nerve Decompression' },
          { name: 'Endolymphatic Sac Approach' },
          { name: "Bill's Island" },
          { name: 'Atticotomy' },
          { name: 'Modified Radical Mastoidectomy' },
          { name: 'Translab Approach to IAC' },
          { name: 'Stapedotomy' },
          { name: 'Incus Transposition Demo' },
          { name: 'Radical Mastoidectomy' },
        ],
        imageUrl: '/images/photo_lab1.jpg',
      },
      {
        blockType: 'sinus-procedures' as const,
        title: 'Procedures on the Paranasal Sinus Model',
        procedures: [
          { name: 'Identification of Endoscopic Anatomical Landmarks' },
          { name: 'Uncinate Process Resection' },
          { name: 'Middle Meatal Antrostomy' },
          { name: 'Anterior Ethmoidectomy' },
          { name: 'Posterior Ethmoidectomy' },
          { name: 'Transethmoid Sphenoidotomy' },
          { name: 'Inferior and Middle Turbinectomy' },
          { name: 'Agar Cell Decapping' },
          { name: 'Medial Maxillectomy' },
          { name: 'Frontoethmoid Recess Approach' },
          { name: 'Bulla Ethmoidalis Opening' },
          { name: 'Transsphenoidal Approach to Pituitary' },
        ],
        imageUrl: '/images/photo_lab2.jpg',
      },
      {
        blockType: 'larynx-procedures' as const,
        title: 'Procedures on the Larynx Model',
        procedures: [
          { name: 'Vocal Nodule Excision' },
          { name: 'Vocal Cord Polypectomy' },
          { name: 'Partial Cordectomy' },
          { name: 'Laryngeal Web Excision' },
        ],
        imageUrl: '/images/photo_micro.jpg',
      },
      {
        blockType: 'variants' as const,
        title: 'Temporal Bone Variants Available',
        variantsList: [
          { code: 'A', title: 'Adult Healthy', desc: 'Standard adult anatomy, fully pneumatised mastoid' },
          { code: 'AP', title: 'Adult Pathological', desc: 'Disease-state anatomy for advanced training' },
          { code: 'P', title: 'Pediatric Healthy', desc: 'Pediatric proportions and landmarks' },
          { code: 'PP', title: 'Pediatric Pathological', desc: 'Complex pediatric cases' },
        ],
      },
      {
        blockType: 'doctor-acknowledgment' as const,
        title: 'Acknowledgment From a Globally Acclaimed Otolaryngologist',
        quote:
          'I have used the 3D-printed temporal bone for training people in ear surgery, especially in cochlear implants, and have found that the anatomical landmarks are really very precise and the feel that you get when you drill this bone is as close to drilling the real temporal bone as possible. So, I find using the 3D-printed temporal bone a very convenient way for training people for ear surgery, especially for cochlear implant surgery.',
        doctorName: 'Dr. Milind Kirtane',
        doctorTitle:
          'MS (ENT), Padma Shri Awardee · Consulting ENT Surgeon, P. D. Hinduja National Hospital, Mumbai; Breach Candy; Saifee Hospital · Hon. Surgeon, King Edward Memorial Hospital',
        imageUrl: '/images/photo_lab2.jpg',
      },
    ],
  }

  if (existing.docs.length > 0) {
    console.log('Updating existing 3d-simulation document...')
    await payload.update({
      collection: '3d-simulation' as any,
      id: existing.docs[0].id,
      data: threeDSimulationData as any,
    })
  } else {
    console.log('Creating initial 3d-simulation document...')
    await payload.create({
      collection: '3d-simulation' as any,
      data: threeDSimulationData as any,
    })
  }

  console.log('Successfully seeded 3d-simulation collection!')
}

if (process.argv[1]?.includes('seed-3d-simulation.ts')) {
  seedThreeDSimulation()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error seeding 3d-simulation:', err)
      process.exit(1)
    })
}
