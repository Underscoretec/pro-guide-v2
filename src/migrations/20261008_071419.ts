import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`videos_page_video_list\` (
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
  	\`meta_text\` text DEFAULT 'Video library · Coming soon on this page',
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`videos_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_page_video_list_order_idx\` ON \`videos_page_video_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`videos_page_video_list_parent_id_idx\` ON \`videos_page_video_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_page_video_list_thumbnail_idx\` ON \`videos_page_video_list\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`videos_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Otolaryngology Video Library' NOT NULL,
  	\`hero_crumb_home_text\` text DEFAULT 'Home',
  	\`hero_crumb_current_text\` text DEFAULT 'Otolaryngology Video Library',
  	\`hero_title\` text DEFAULT 'Otolaryngology Video Library',
  	\`hero_description\` text DEFAULT 'Watch surgical demonstration videos, 3D model drilling techniques, and expert step-by-step tutorials from master otolaryngology faculty.',
  	\`section_header_heading\` text DEFAULT 'Surgical Demonstration & Drilling Videos',
  	\`section_header_subheading\` text DEFAULT 'Practical surgical guidance and simulation model walkthroughs.',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_page_updated_at_idx\` ON \`videos_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_page_created_at_idx\` ON \`videos_page\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`videos_page_id\` integer REFERENCES videos_page(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_videos_page_id_idx\` ON \`payload_locked_documents_rels\` (\`videos_page_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`videos_page_video_list\`;`)
  await db.run(sql`DROP TABLE \`videos_page\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`shipping_addresses_id\` integer,
  	\`media_id\` integer,
  	\`home_page_id\` integer,
  	\`resources_id\` integer,
  	\`contact_page_id\` integer,
  	\`contact_submissions_id\` integer,
  	\`products_page_id\` integer,
  	\`customized_model_page_id\` integer,
  	\`customized_model_submissions_id\` integer,
  	\`workshops_page_id\` integer,
  	\`training_courses_page_id\` integer,
  	\`checkout_submissions_id\` integer,
  	\`lead_submissions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipping_addresses_id\`) REFERENCES \`shipping_addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`home_page_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`resources_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_page_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_submissions_id\`) REFERENCES \`contact_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_page_id\`) REFERENCES \`products_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customized_model_page_id\`) REFERENCES \`customized_model_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customized_model_submissions_id\`) REFERENCES \`customized_model_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`workshops_page_id\`) REFERENCES \`workshops_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`training_courses_page_id\`) REFERENCES \`training_courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`checkout_submissions_id\`) REFERENCES \`checkout_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lead_submissions_id\`) REFERENCES \`lead_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "checkout_submissions_id", "lead_submissions_id") SELECT "id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "checkout_submissions_id", "lead_submissions_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_shipping_addresses_id_idx\` ON \`payload_locked_documents_rels\` (\`shipping_addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_home_page_id_idx\` ON \`payload_locked_documents_rels\` (\`home_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_resources_id_idx\` ON \`payload_locked_documents_rels\` (\`resources_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_page_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_page_id_idx\` ON \`payload_locked_documents_rels\` (\`products_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customized_model_page_id_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customized_model_submissio_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_workshops_page_id_idx\` ON \`payload_locked_documents_rels\` (\`workshops_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_training_courses_page_id_idx\` ON \`payload_locked_documents_rels\` (\`training_courses_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_checkout_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`checkout_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lead_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_submissions_id\`);`)
}
