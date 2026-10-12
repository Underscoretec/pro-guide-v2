import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`users\` ADD \`country\` text;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`users\` ADD \`is_india\` integer DEFAULT true;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`products\` ADD \`price_u_s_d\` numeric;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`products\` ADD \`family_id\` text;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`carts_items\` ADD \`price_u_s_d\` numeric;`)
  } catch (e) {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`country\`;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`is_india\`;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`price_u_s_d\`;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`family_id\`;`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`carts_items\` DROP COLUMN \`price_u_s_d\`;`)
  } catch (e) {}
}

