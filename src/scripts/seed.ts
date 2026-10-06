import config from '../payload.config'
import { getPayload } from 'payload'

const seedProducts = [
  {
    title: '3D Temporal Bone',
    slug: 'tb',
    imageUrl: '/images/prod1.jpg',
    alt: '3D Temporal Bone',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=tb',
    order: 1,
  },
  {
    title: 'Paranasal Model with Bassettes',
    slug: 'pnsb',
    imageUrl: '/images/prod2.jpg',
    alt: 'Paranasal Model with Bassettes',
    variant: 'Available in Left and Right variant',
    price: 'Rs 25,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=pnsb',
    order: 2,
  },
  {
    title: 'Paranasal Model without base',
    slug: 'pns',
    imageUrl: '/images/prod3.jpg',
    alt: 'Paranasal Model without base',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=pns',
    order: 3,
  },
  {
    title: 'Larynx Model',
    slug: 'larynx',
    imageUrl: '/images/prod4.jpg',
    alt: 'Larynx Model',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=larynx',
    order: 4,
  },
]

const seedWorkshops = [
  {
    title: 'Basic 3D Temporal Bone Dissection Workshop',
    category: 'temporal' as const,
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_lab.jpg',
    alt: 'Delegates at microscope stations',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    order: 1,
  },
  {
    title: 'Advanced Temporal Bone Dissection Workshop',
    category: 'temporal' as const,
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_faculty.jpg',
    alt: 'Faculty guiding a delegate at the microscope',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    order: 2,
  },
  {
    title: 'Cochlear Implant Surgery Workshop',
    category: 'temporal' as const,
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_lecture.jpg',
    alt: 'Faculty demonstration session',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    order: 3,
  },
  {
    title: 'Paranasal Sinuses Workshop',
    category: 'sinus' as const,
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_room2.jpg',
    alt: 'Hands-on workshop stations',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    order: 4,
  },
  {
    title: 'Balloon Sinuplasty & Eustachian Tube Dilatation Workshop',
    category: 'sinus' as const,
    tagline: 'KBI SkillBridge',
    meta: 'Single-day hands-on with didactic lectures and video demonstrations',
    imageUrl: '/images/ws_skilllab.jpg',
    alt: 'KBI Skill Lab, Andheri East',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    order: 5,
  },
  {
    title: 'Larynx Workshop — Microlaryngoscopy & Laser Surgeries',
    category: 'larynx' as const,
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_lecture.jpg',
    alt: 'Faculty demonstration session',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    order: 6,
  },
]

const seedFaculty = [
  {
    initials: 'PN',
    name: 'Dr. Prashant Naik',
    role: 'MS (ENT), DLO — ENT Specialist',
    bio: 'Creator of a precise 3D-printed replica of the temporal bone. Active member of the AAO-HNSF and the Politzer Society, and peer reviewer for the Otolaryngology–Head and Neck Surgery journal. Runs hands-on dissection workshops and manages an open-access temporal bone dissection lab for aspiring and established otologists.',
    order: 1,
  },
  {
    initials: 'MK',
    name: 'Dr. Milind Kirtane',
    role: 'MS, DORL, DSc (Hon.) — Padma Shri Awardee',
    bio: "Consulting ENT Surgeon at P. D. Hinduja National Hospital, Breach Candy and Saifee Hospital, Mumbai, and Honorary Surgeon at King Edward Memorial Hospital. One of India's most respected cochlear implant surgeons and a pioneer of ENT surgical teaching.",
    order: 2,
  },
  {
    initials: 'GF',
    name: 'Guest Faculty',
    role: 'Visiting professors & senior surgeons',
    bio: 'Each workshop edition brings visiting national and international faculty for station teaching and live demonstration. Faculty for upcoming editions are announced on the registration page.',
    order: 3,
  },
]

const seedTestimonials = [
  {
    quote:
      '“For the first time I have operated on a 3D-printed temporal bone and I got what I was looking for in a cadaver bone.”',
    author: 'Workshop participant — MS, Otolaryngology',
    type: 'feedback' as const,
    order: 1,
  },
  {
    quote:
      '“Extremely impressed with the quality of the temporal bone. It is the best imitation of the normal bone I have drilled.”',
    author: 'Workshop participant — MS, Otolaryngology',
    type: 'feedback' as const,
    order: 2,
  },
  {
    quote:
      '“My perfect temporal bone is really a very nice bone to learn. It is a boon in training for the younger generation.”',
    author: 'Workshop participant — MS, Otolaryngology',
    type: 'feedback' as const,
    order: 3,
  },
  {
    quote:
      '“It is very good learning session. Also is the first time I had operated with such type of workshop.”',
    author: 'Workshop participant — MS, Otolaryngology',
    type: 'feedback' as const,
    order: 4,
  },
  {
    quote:
      '“The model was very similar to real temporal bone and the team cleared our doubts and helped us at each step.”',
    author: 'Workshop participant — MS, Otolaryngology',
    type: 'feedback' as const,
    order: 5,
  },
  {
    quote:
      '“Highlight of the workshop is knowledge with the profound experience of workshop director.”',
    author: 'Workshop participant — MS, Otolaryngology',
    type: 'feedback' as const,
    order: 6,
  },
  {
    quote:
      'The hands-on format changed how I approach mastoid surgery. Drilling my own model at every station — with faculty beside me — did what years of observation could not.',
    author: 'Resident delegate — Temporal Bone Workshop',
    type: 'story' as const,
    order: 7,
  },
  {
    quote:
      "The sinus model's landmarks under the endoscope are remarkably true to life. I returned to my department and asked them to equip our skills lab with these models.",
    author: 'Consultant delegate — Paranasal Sinus Workshop',
    type: 'story' as const,
    order: 8,
  },
  {
    quote:
      'From registration to certificate, everything was organised. The models, the stations, the teaching — it is the most practice I have packed into two days.',
    author: 'Fellow delegate — Skull Base Workshop',
    type: 'story' as const,
    order: 9,
  },
]

const seedPosts = [
  {
    title: 'Mastering Temporal Bone Anatomy — The Key to Surgical Excellence',
    slug: 'temporal-bone-anatomy',
    category: 'Temporal Bone',
    excerpt:
      'Why the temporal bone remains the defining challenge of otologic training, and how simulation accelerates the learning curve.',
    meta: 'By ProGuide Editorial · 5 min read',
    imageUrl: '/images/photo_micro.jpg',
    order: 1,
  },
  {
    title: 'Why Hands-On Workshops Are Essential for ENT Surgeons',
    slug: 'hands-on-workshops-essential',
    category: 'Workshops',
    excerpt:
      'Medical education is evolving — and hands-on workshops are now a fundamental part of surgical training for safe, independent practice.',
    meta: 'By ProGuide Editorial · 4 min read',
    imageUrl: '/images/photo_lab1.jpg',
    order: 2,
  },
  {
    title: 'How 3D Simulation Is Revolutionizing ENT Surgical Training',
    slug: '3d-simulation-revolutionizing-ent',
    category: '3D Training',
    excerpt:
      "Surgical training has witnessed a transformation with the introduction of high-fidelity 3D simulation models — here's what changed.",
    meta: 'By ProGuide Editorial · 6 min read',
    imageUrl: '/images/photo_lab2.jpg',
    order: 3,
  },
]

export async function seed() {
  console.log('🌱 Starting Payload CMS database seed...')
  const payload = await getPayload({ config })

  // 1. Seed Header Global
  console.log('🧭 Seeding Header Global...')
  try {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        announcement: {
          text: 'Unlock new opportunities by upskilling and stepping into a brighter future.',
          linkText: 'Explore Now!!',
          linkUrl: '#workshops',
        },
        logoUrl: '/images/logo.svg',
        searchPlaceholder: 'What would you like to learn?',
        navItems: [
          { label: 'Home', url: '/' },
          {
            label: 'Learning',
            hasDropdown: true,
            dropdownItems: [
              { label: 'About Faculty & Training', url: '/training-courses.html' },
              { label: 'Otolaryngology Video Library', url: '/videos.html' },
              { label: 'Why 3D Simulation Models', url: '/resources.html' },
            ],
          },
          {
            label: 'Training Courses',
            hasDropdown: true,
            dropdownItems: [
              { label: '3D Temporal Bone', url: '#workshops' },
              { label: 'Paranasal Sinus', url: '#workshops' },
              { label: 'Microlaryngoscopy & Laser Surgeries', url: '#workshops' },
              { label: 'Types of Training Courses Conducted', url: '/training-courses.html' },
            ],
          },
          { label: 'Resources', url: '/resources.html' },
          { label: 'Get Your Own Customized Model', url: '/customized-model.html' },
          { label: 'Contact Us', url: '/contact.html' },
        ],
        buyNowButton: {
          text: 'Buy Now',
          url: '/products.html',
        },
        cartUrl: 'https://pro-guide.in/',
        loginButton: {
          text: 'Login /Register',
          url: 'https://pro-guide.in/',
        },
      },
    })
    console.log('  + Header Global seeded')
  } catch (err) {
    console.warn('  ! Header global update note:', err)
  }

  // 2. Seed Footer Global
  console.log('⚓ Seeding Footer Global...')
  try {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        logoUrl: '/images/logo_white.svg',
        quickLinksTitle: 'Quick Links',
        quickLinks: [
          { label: 'Buy Now', url: '/products.html' },
          { label: 'Cart', url: 'https://pro-guide.in/' },
          { label: 'Resources', url: '/resources.html' },
          { label: 'Get Your Own Customized Model', url: '/customized-model.html' },
          { label: 'Login/Register', url: 'https://pro-guide.in/' },
        ],
        indianQuery: {
          title: 'Contacts for Indian Queries',
          name: 'Shelly Sequeira',
          email: 'shelly@knowledgebridgeint.com',
          phone: '9220522294',
        },
        internationalQuery: {
          title: 'Contacts for International Queries',
          name: 'Shashikumar Sambhoo',
          email: 'svs@knowledgebridgeint.com',
          phone: '+971 507863903 | +91 9820454543',
        },
        address: {
          title: 'Address',
          text: '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East). Mumbai-400059, Maharashtra, India',
        },
        about:
          'ProGuide is dedicated to equipping individuals, businesses, and organizations with the skills needed for the future by providing accessible and affordable high-quality education. Through collaborations with leading institutions and industry experts, ProGuide offers a wide range of courses, certifications, and professional programs designed to enhance career growth and business success.',
        legalLinks: [
          { label: 'Privacy Policy', url: 'https://pro-guide.in/' },
          { label: 'Terms and Condition', url: 'https://pro-guide.in/' },
          { label: 'Shipping Policy', url: 'https://pro-guide.in/' },
          { label: 'Cancellation and Return Policy', url: 'https://pro-guide.in/' },
        ],
        copyright:
          '© 2026. All Rights Reserved · 3D simulation models by OSSA PLUS SIMULATION LLP — ossa.sudors.in',
        socialLinks: [
          { platform: 'f', url: '#' },
          { platform: 'in', url: '#' },
          { platform: 'X', url: '#' },
          { platform: '►', url: '#' },
        ],
      },
    })
    console.log('  + Footer Global seeded')
  } catch (err) {
    console.warn('  ! Footer global update note:', err)
  }

  // 3. Seed HomePage Blocks Collection
  console.log('🏠 Seeding HomePage Block Collection...')
  const existingHomePage = await payload.find({
    collection: 'home-page',
    limit: 1,
  })

  const homePageData = {
    title: 'Home',
    description: 'Otolaryngology Head & Neck 3D Simulation Models',
    sections: [
      {
        blockType: 'hero' as const,
        headline: 'Otolaryngology Head & Neck 3D Simulation Models',
        lede: 'Simulation surgery models for learning the surgeries in a hygienic & easier way! KnowledgeBridge International is a tech knowledge company developing market-leading, innovative tools in collaboration with the medical community.',
        ticks: [
          { text: 'Participate in upcoming workshops' },
          { text: 'Purchase 3D Simulation Models' },
          { text: 'Get your own customized model from a CT scan' },
        ],
        primaryCTA: { text: 'Explore Products', link: '#products' },
        secondaryCTA: { text: 'Explore Workshops', link: '#workshops' },
        mainImageUrl: '/images/ws_guide2.jpg',
        cardImage1Url: '/images/prod1.jpg',
        cardImage2Url: '/images/prod3.jpg',
        carouselImages: [
          { imageUrl: '/images/prod1.jpg', alt: '3D temporal bone model' },
          { imageUrl: '/images/prod2.jpg', alt: 'Paranasal Model with Bassettes' },
          { imageUrl: '/images/prod3.jpg', alt: 'Paranasal sinus model' },
          { imageUrl: '/images/prod4.jpg', alt: 'Larynx Model' },
        ],
      },
      {
        blockType: 'partners' as const,
        title: 'Partnerships with top institutes to make world-class education accessible globally',
        partnersList: [
          { name: "Dr. Reddy's", logoUrl: '/images/partners/dr-reddys.png' },
          { name: 'Zydus', logoUrl: '/images/partners/zydus.png' },
          { name: 'GSK', logoUrl: '/images/partners/gsk.png' },
          { name: 'Torrent Pharma', logoUrl: '/images/partners/torrent.png' },
          { name: 'Alembic', logoUrl: '/images/partners/alembic.png' },
          { name: 'Radiant Pharmaceuticals', logoUrl: '/images/partners/radiant.png' },
          { name: 'Abbott', logoUrl: '/images/partners/abbott.png' },
          { name: 'Sun Pharma', logoUrl: '/images/partners/sun-pharma.png' },
        ],
      },
      {
        blockType: 'products' as const,
        title: 'Product Offerings',
        productsList: seedProducts,
      },
      {
        blockType: 'true-to-life-details' as const,
        title: 'Every Detail, True to Life',
        subtitle: 'Straight from our bench — unretouched photographs of the models our delegates train on.',
        detailsList: [
          {
            category: 'Temporal Bone',
            title: 'Ear canal, membrane & ossicles',
            description: 'Look down the canal of the temporal bone model — chorda tympani and ossicular detail included.',
            imageUrl: '/images/detail_macro.jpg',
            alt: 'Ear canal and tympanic membrane detail',
          },
          {
            category: 'Temporal Bone',
            title: 'Sigmoid sinus, nerves & dura',
            description: 'Colour-true vessels and nerve pathways run through the bone, exactly where surgery will find them.',
            imageUrl: '/images/detail_sigmoid.jpg',
            alt: 'Temporal bone with sigmoid sinus and nerves',
          },
          {
            category: 'Middle Ear',
            title: 'Facial nerve & vascular anatomy',
            description: 'The complete middle ear cleft with facial nerve and vessels for decompression and re-routing work.',
            imageUrl: '/images/detail_middleear.jpg',
            alt: 'Middle ear anatomy with vessels and facial nerve',
          },
          {
            category: 'Rhinology',
            title: 'Soft-tissue nose & nasal cavity',
            description: 'Lifelike external nose over the full sinonasal anatomy — scope it as you would a patient.',
            imageUrl: '/images/detail_nose.jpg',
            alt: 'External nose soft tissue model',
          },
          {
            category: 'Laryngology',
            title: 'Glottis with replaceable lesions',
            description: "The larynx model's endoscopic view — cassettes simulate nodules, polyps and webs for excision practice.",
            imageUrl: '/images/detail_larynxtop.jpg',
            alt: 'Endoscopic view of the larynx model with lesion',
          },
          {
            category: 'Otology',
            title: 'Silicone pinna & canal',
            description: 'A soft, lifelike ear for endoscopic ear surgery, canal work and examination training.',
            imageUrl: '/images/detail_ear.jpg',
            alt: 'Silicone ear model',
          },
        ],
      },
      {
        blockType: 'workshops' as const,
        title: 'Explore Workshops',
        workshopsList: seedWorkshops,
      },
      {
        blockType: 'workshop-glimpses' as const,
        tag: 'Glimpses from our first KBI SkillBridge workshop',
        title: 'Advanced Temporal Bone Dissection Workshop',
        description: '2 October 2026 · KBI Skill Lab, Andheri East, Mumbai · Under the aegis of AOI Mumbai West, ahead of Mumbai Manthan 3.0 — every delegate drilled their own 3D temporal bone model under faculty guidance.',
        collageImageUrl: '/images/ws_collage.jpg',
        gallery: [
          { imageUrl: '/images/ws_lab.jpg', alt: 'Delegates at stations' },
          { imageUrl: '/images/ws_faculty.jpg', alt: 'One-to-one faculty guidance' },
          { imageUrl: '/images/ws_lecture.jpg', alt: 'Live demonstration' },
          { imageUrl: '/images/ws_skilllab.jpg', alt: 'KBI Skill Lab inauguration' },
        ],
      },
      {
        blockType: 'why-artificial-bone' as const,
        title: 'Why Artificial Bone',
        imageUrl: '/images/detail_macro.jpg',
        checkList: [
          {
            title: 'Essential Skills for Surgical Procedures',
            description: 'Mastering the anatomy of the temporal bone, larynx and paranasal sinuses is crucial before performing surgical procedures.',
          },
          {
            title: 'The Need for 3D Simulation Models',
            description: 'While cadaveric dissection is ideal, it is often unavailable. Realistic 3D models provide a superior alternative for surgical training.',
          },
          {
            title: 'Highly Detailed Temporal Bone Model',
            description: 'Each artificial temporal bone replicates internal and external anatomy — practice mastoid surgeries, facial nerve decompression and cochlear implant insertion.',
          },
          {
            title: 'Accurate 3D Paranasal Sinus Model',
            description: 'With over 90% anatomical accuracy, detailed sinus structures and soft tissue enhance surgical training precision.',
          },
        ],
        stats: [
          { value: '100%', label: 'Safety in temporal bone laboratory' },
          { value: '90%', label: 'Value for surgical experience' },
          { value: '94%', label: 'External anatomical features' },
          { value: '85%', label: 'Internal anatomical features' },
          { value: '92%', label: 'Drill response vs cadaver temporal bone' },
        ],
      },
      {
        blockType: 'faculty' as const,
        title: 'World-Class Faculty',
        subtitle: 'Learn from faculty members who bring a blend of theory and practice, and real-world examples relevant to your learning experience.',
        facultyList: seedFaculty,
      },
      {
        blockType: 'testimonials' as const,
        feedbackTitle: 'Temporal Bone Dissection Workshop Feedback',
        feedbackList: seedTestimonials.filter((t) => t.type === 'feedback'),
        storiesTitle: 'What Our Learners Are Saying',
        storiesList: seedTestimonials.filter((t) => t.type === 'story'),
      },
      {
        blockType: 'bone-variants' as const,
        title: 'Temporal Bone Variants',
        variantsList: [
          { code: 'A', title: 'Adult Healthy', description: 'Standard adult anatomy with full mastoid pneumatisation' },
          { code: 'AP', title: 'Adult Pathological', description: 'Disease-state anatomy for advanced decision training' },
          { code: 'P', title: 'Pediatric Healthy', description: 'Pediatric proportions and landmark relationships' },
          { code: 'PP', title: 'Pediatric Pathological', description: 'Complex pediatric cases for senior trainees' },
        ],
      },
      {
        blockType: 'lead-form' as const,
        title: 'Let us guide you in your upskilling journey',
        subtitle: 'Our programme experts are available 7 days a week. Fill the form and we will help you choose the right programme.',
        submitEmail: 'shelly@knowledgebridgeint.com',
      },
      {
        blockType: 'blog' as const,
        tag: 'Catch the latest updates on',
        title: 'The ProGuide Blog',
        postsList: seedPosts,
      },
    ],
  }

  if (existingHomePage.totalDocs === 0) {
    await payload.create({
      collection: 'home-page',
      data: homePageData,
    })
    console.log('  + Created HomePage document with 12 blocks')
  } else {
    await payload.update({
      collection: 'home-page',
      id: existingHomePage.docs[0].id,
      data: homePageData,
    })
    console.log('  = Updated existing HomePage document with 12 blocks')
  }

  // Seed Resources Page
  const existingResources = await payload.find({
    collection: 'resources',
    limit: 1,
  })

  const resourcesData = {
    title: 'Resources Page',
    sections: [
      {
        blockType: 'resources-hero' as const,
        crumbHomeText: 'Home',
        crumbCurrentText: 'Resources',
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

  if (existingResources.totalDocs === 0) {
    await payload.create({
      collection: 'resources',
      data: resourcesData,
    })
    console.log('  + Created Resources document with 8 blocks')
  } else {
    await payload.update({
      collection: 'resources',
      id: existingResources.docs[0].id,
      data: resourcesData,
    })
    console.log('  = Updated existing Resources document with 8 blocks')
  }

  console.log('✅ Full database seed completed successfully!')
}

// Allow direct CLI execution: tsx src/scripts/seed.ts
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err)
      process.exit(1)
    })
}
