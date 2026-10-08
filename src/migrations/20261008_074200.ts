import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`learning_bites_page_video_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text,
  	\`duration\` text,
  	\`thumbnail_id\` integer,
  	\`thumbnail_url\` text,
  	\`video_url\` text,
  	\`description\` text,
  	\`meta_text\` text DEFAULT 'Video library · Skill Lab Demonstration',
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`learning_bites_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`learning_bites_page_video_list_order_idx\` ON \`learning_bites_page_video_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`learning_bites_page_video_list_parent_id_idx\` ON \`learning_bites_page_video_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`learning_bites_page_video_list_thumbnail_idx\` ON \`learning_bites_page_video_list\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`learning_bites_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Learning Bites' NOT NULL,
  	\`hero_crumb_home_text\` text DEFAULT 'Home',
  	\`hero_crumb_current_text\` text DEFAULT 'Learning Bites',
  	\`hero_title\` text DEFAULT 'Learning Bites',
  	\`hero_description\` text DEFAULT 'Watch surgical demonstration videos, 3D model drilling techniques, and expert step-by-step tutorials from master otolaryngology faculty.',
  	\`section_header_heading\` text DEFAULT 'Surgical Demonstration & Drilling Videos',
  	\`section_header_subheading\` text DEFAULT 'Practical surgical guidance and simulation model walkthroughs.',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`learning_bites_page_updated_at_idx\` ON \`learning_bites_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`learning_bites_page_created_at_idx\` ON \`learning_bites_page\` (\`created_at\`);`)
  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`learning_bites_page_id\` integer REFERENCES learning_bites_page(id);`)
  } catch (e) {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`learning_bites_page_video_list\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`learning_bites_page\`;`)
}
