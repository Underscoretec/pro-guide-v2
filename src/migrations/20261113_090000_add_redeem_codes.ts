import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`CREATE TABLE IF NOT EXISTS \`redeem_codes\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`code\` text NOT NULL,
      \`discount_percent\` numeric DEFAULT 50 NOT NULL,
      \`allowed_institute\` text,
      \`max_uses\` numeric,
      \`used_count\` numeric DEFAULT 0,
      \`is_active\` integer DEFAULT 1,
      \`expires_at\` text,
      \`notes\` text,
      \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
    );`)
    await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`redeem_codes_code_idx\` ON \`redeem_codes\` (\`code\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`redeem_codes_updated_at_idx\` ON \`redeem_codes\` (\`updated_at\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`redeem_codes_created_at_idx\` ON \`redeem_codes\` (\`created_at\`);`)
  } catch {}

  try {
    await db.run(sql`CREATE TABLE IF NOT EXISTS \`redeem_codes_rels\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`order\` integer,
      \`parent_id\` integer NOT NULL,
      \`path\` text NOT NULL,
      \`workshop_details_id\` integer,
      FOREIGN KEY (\`parent_id\`) REFERENCES \`redeem_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
      FOREIGN KEY (\`workshop_details_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
    );`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`redeem_codes_rels_order_idx\` ON \`redeem_codes_rels\` (\`order\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`redeem_codes_rels_parent_idx\` ON \`redeem_codes_rels\` (\`parent_id\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`redeem_codes_rels_path_idx\` ON \`redeem_codes_rels\` (\`path\`);`)
  } catch {}

  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`redeem_codes_id\` integer REFERENCES redeem_codes(id);`)
  } catch {}

  try {
    await db.run(sql`ALTER TABLE \`workshop_registrations\` ADD COLUMN \`applied_coupon\` text;`)
  } catch {}

  try {
    await db.run(sql`ALTER TABLE \`workshop_registrations\` ADD COLUMN \`discount_percent\` numeric;`)
  } catch {}
}

export async function down(): Promise<void> {}

