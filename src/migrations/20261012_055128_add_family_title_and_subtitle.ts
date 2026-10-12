import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`products\` ADD \`family_title\` text;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`products\` ADD \`family_subtitle\` text;`)
  } catch (e) {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`family_title\`;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`family_subtitle\`;`)
  } catch (e) {}
}

