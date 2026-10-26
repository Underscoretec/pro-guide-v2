import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`users\` ADD \`password_reset_otp_hash\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`password_reset_otp_expires_at\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`password_reset_otp_hash\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`password_reset_otp_expires_at\`;`)
}
