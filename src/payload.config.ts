import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomePage } from './collections/HomePage'
import { Resources } from './collections/Resources'

import { ContactPage } from './collections/ContactPage'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { ProductsPage } from './collections/ProductsPage'
import { CustomizedModelPage } from './collections/CustomizedModelPage'
import { CustomizedModelSubmissions } from './collections/CustomizedModelSubmissions'
import { WorkshopsPage } from './collections/WorkshopsPage'
import { TrainingCoursesPage } from './collections/TrainingCoursesPage'
import { CheckoutSubmission } from './collections/CheckoutSubmission'
import Header from './globals/Header'
import Footer from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
 
  
  collections: [
    Users,
    Media,
    HomePage,
    Resources,
    ContactPage,
    ContactSubmissions,
    ProductsPage,
    CustomizedModelPage,
    CustomizedModelSubmissions,
    WorkshopsPage,
    TrainingCoursesPage,
    CheckoutSubmission
  ],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key-change-in-env',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
    push: true,
  }),
})
