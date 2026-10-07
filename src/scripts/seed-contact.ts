import { getPayload } from 'payload'
import config from '../payload.config'

async function seedContact() {
  const payload = await getPayload({ config })

  console.log('Seeding ContactPage collection...')

  const existing = await payload.find({
    collection: 'contact-page',
    limit: 1,
  })

  if (existing.docs.length === 0) {
    await payload.create({
      collection: 'contact-page',
      data: {
        title: 'Get In Touch',
        heroDescription:
          "Have questions or need assistance? We're here to help — workshops, models, bulk and institutional orders, or anything else.",
        indianQueries: {
          title: 'Contacts for Indian Queries',
          name: 'Shelly Sequeira',
          email: 'shelly@knowledgebridgeint.com',
          phone: '9220522294',
        },
        internationalQueries: {
          title: 'Contacts for International Queries',
          name: 'Shashikumar Sambhoo',
          email: 'svs@knowledgebridgeint.com',
          phone: '+971 507863903 | +91 9820454543',
        },
        address: {
          title: 'Address',
          text: '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East), Mumbai-400059, Maharashtra, India',
        },
        formDisclaimer:
          'By clicking the button below, you agree to receive communications via Email/Call/WhatsApp/SMS from KnowledgeBridge about this programme and other relevant programmes.',
      },
    })
    console.log('Successfully seeded ContactPage document!')
  } else {
    console.log('ContactPage document already exists.')
  }

  process.exit(0)
}

seedContact().catch((err) => {
  console.error('Error seeding ContactPage:', err)
  process.exit(1)
})
