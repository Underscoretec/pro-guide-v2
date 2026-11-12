import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD COLUMN \`faculty_lead_name\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD COLUMN \`cme_credits\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD COLUMN \`language\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD COLUMN \`cluster\` text;`)
  } catch {}

  try {
    await db.run(sql`CREATE TABLE IF NOT EXISTS \`workshop_details_faculty\` (
      \`_order\` integer NOT NULL,
      \`_parent_id\` integer NOT NULL,
      \`id\` text PRIMARY KEY NOT NULL,
      \`name\` text NOT NULL,
      \`role\` text,
      \`bio\` text,
      \`avatar_bg\` text
    );`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`workshop_details_faculty_order_idx\` ON \`workshop_details_faculty\` (\`_order\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`workshop_details_faculty_parent_id_idx\` ON \`workshop_details_faculty\` (\`_parent_id\`);`)
  } catch {}

  try {
    await db.run(sql`CREATE TABLE IF NOT EXISTS \`workshop_details_faq\` (
      \`_order\` integer NOT NULL,
      \`_parent_id\` integer NOT NULL,
      \`id\` text PRIMARY KEY NOT NULL,
      \`question\` text NOT NULL,
      \`answer\` text NOT NULL
    );`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`workshop_details_faq_order_idx\` ON \`workshop_details_faq\` (\`_order\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`workshop_details_faq_parent_id_idx\` ON \`workshop_details_faq\` (\`_parent_id\`);`)
  } catch {}

  try {
    await db.run(sql`CREATE TABLE IF NOT EXISTS \`workshop_details_fee_inclusions\` (
      \`_order\` integer NOT NULL,
      \`_parent_id\` integer NOT NULL,
      \`id\` text PRIMARY KEY NOT NULL,
      \`text\` text NOT NULL
    );`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`workshop_details_fee_inclusions_order_idx\` ON \`workshop_details_fee_inclusions\` (\`_order\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`workshop_details_fee_inclusions_parent_id_idx\` ON \`workshop_details_fee_inclusions\` (\`_parent_id\`);`)
  } catch {}
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // SQLite does not require drop column
}

