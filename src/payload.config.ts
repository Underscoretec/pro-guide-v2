import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { ShippingAddresses } from './collections/ShippingAddresses'
import { Media } from './collections/Media'
import { HomePage } from './collections/HomePage'
import { Resources } from './collections/Resources'
import { ThreeDSimulation } from './collections/ThreeDSimulation'

import { ContactPage } from './collections/ContactPage'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { ProductsPage } from './collections/ProductsPage'
import { CustomizedModelPage } from './collections/CustomizedModelPage'
import { CustomizedModelSubmissions } from './collections/CustomizedModelSubmissions'
import { WorkshopsPage } from './collections/WorkshopsPage'
import { WorkshopDetails } from './collections/WorkshopDetails'
import { WorkshopRegistrations } from './collections/WorkshopRegistrations'
import { RedeemCodes } from './collections/RedeemCodes'
import { TrainingCoursesPage } from './collections/TrainingCoursesPage'
import { LeadSubmissions } from './collections/LeadSubmissions'
import { LearningBitesPage } from './collections/LearningBitesPage'
import { Carts } from './collections/Carts'
import { Orders } from './collections/Orders'
import { Products } from './collections/Products'
import { Blogs } from './collections/Blogs'
import Header from './globals/Header'
import Footer from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const doctorAccessibleSlugs = ['workshop-details', 'workshop-registrations', 'redeem-codes', 'media', 'users']

const rawCollections = [
  Users,
  ShippingAddresses,
  Orders,
  Products,
  Blogs,
  Media,
  HomePage,
  Resources,
  ThreeDSimulation,
  ContactPage,
  ContactSubmissions,
  ProductsPage,
  CustomizedModelPage,
  CustomizedModelSubmissions,
  WorkshopsPage,
  WorkshopDetails,
  WorkshopRegistrations,
  RedeemCodes,
  TrainingCoursesPage,
  LeadSubmissions,
  LearningBitesPage,
  Carts,
]

const collections = rawCollections.map((col) => {
  if (doctorAccessibleSlugs.includes(col.slug)) {
    return col
  }
  return {
    ...col,
    admin: {
      ...col.admin,
      hidden: ({ user }: { user?: any }) => user?.role === 'doctor',
    },
  }
})

const globals = [Header, Footer].map((gl) => ({
  ...gl,
  admin: {
    ...gl.admin,
    hidden: ({ user }: { user?: any }) => user?.role === 'doctor',
  },
}))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key-change-in-env',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
    push: false,
  }),
})
