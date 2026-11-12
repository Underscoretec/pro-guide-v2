import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD COLUMN \`registered_users\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD COLUMN \`revenue_sample\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD COLUMN \`offline_details_cancellation_policy\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details_dates_and_time_slots_slots\` ADD COLUMN \`registrations_count\` integer DEFAULT 0;`)
  } catch {}
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // SQLite does not require column drop in down migration
}

