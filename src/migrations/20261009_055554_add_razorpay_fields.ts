import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`orders\` ADD \`razorpay_order_id\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`razorpay_payment_id\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`payment_failure_reason\` text;`)
  await db.run(sql`CREATE INDEX \`orders_razorpay_order_id_idx\` ON \`orders\` (\`razorpay_order_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`orders_razorpay_order_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`razorpay_order_id\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`razorpay_payment_id\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`payment_failure_reason\`;`)
}
