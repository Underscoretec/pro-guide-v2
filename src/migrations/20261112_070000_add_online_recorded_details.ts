import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD \`online_recorded_details_access_window_days\` numeric DEFAULT 90;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD \`online_recorded_details_subtitles\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`workshop_details\` ADD \`online_recorded_details_preview_clip\` text;`)
  } catch {}

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`workshop_details_online_recorded_details_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`duration\` text,
  	\`video_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_online_recorded_details_videos_order_idx\` ON \`workshop_details_online_recorded_details_videos\` (\`_order\`);`)
  } catch {}
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_online_recorded_details_videos_parent_id_idx\` ON \`workshop_details_online_recorded_details_videos\` (\`_parent_id\`);`)
  } catch {}

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`workshop_details_online_recorded_details_handouts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`file_size\` text,
  	\`file_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_online_recorded_details_handouts_order_idx\` ON \`workshop_details_online_recorded_details_handouts\` (\`_order\`);`)
  } catch {}
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_online_recorded_details_handouts_parent_id_idx\` ON \`workshop_details_online_recorded_details_handouts\` (\`_parent_id\`);`)
  } catch {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`workshop_details_online_recorded_details_videos\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`workshop_details_online_recorded_details_handouts\`;`)
}

