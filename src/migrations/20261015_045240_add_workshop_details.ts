import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`workshop_details_designation_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_designation_bullets_order_idx\` ON \`workshop_details_designation_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_designation_bullets_parent_id_idx\` ON \`workshop_details_designation_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workshop_details_academic_subheadings_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details_academic_subheadings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_academic_subheadings_bullets_order_idx\` ON \`workshop_details_academic_subheadings_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_academic_subheadings_bullets_parent_id_idx\` ON \`workshop_details_academic_subheadings_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workshop_details_academic_subheadings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_academic_subheadings_order_idx\` ON \`workshop_details_academic_subheadings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_academic_subheadings_parent_id_idx\` ON \`workshop_details_academic_subheadings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workshop_details_why_train_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_why_train_bullets_order_idx\` ON \`workshop_details_why_train_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_why_train_bullets_parent_id_idx\` ON \`workshop_details_why_train_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workshop_details_experience_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_experience_content_order_idx\` ON \`workshop_details_experience_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_experience_content_parent_id_idx\` ON \`workshop_details_experience_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workshop_details_teaching_philosophy\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_details_teaching_philosophy_order_idx\` ON \`workshop_details_teaching_philosophy\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_teaching_philosophy_parent_id_idx\` ON \`workshop_details_teaching_philosophy\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workshop_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`subtitle\` text DEFAULT 'KBI SkillBridge • Hands-On Faculty-Led Dissection Workshop',
  	\`category\` text DEFAULT 'ENT & Surgical Training',
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`duration\` text DEFAULT '1-2 Days Hands-On',
  	\`learners\` text DEFAULT '1:1 Station Ratio',
  	\`academic_heading\` text DEFAULT 'Academic & Surgical Procedural Coverage',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`workshop_details_slug_idx\` ON \`workshop_details\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_image_idx\` ON \`workshop_details\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_updated_at_idx\` ON \`workshop_details\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_created_at_idx\` ON \`workshop_details\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`workshop_details_id\` integer REFERENCES workshop_details(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_workshop_details_id_idx\` ON \`payload_locked_documents_rels\` (\`workshop_details_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`workshop_details_designation_bullets\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_academic_subheadings_bullets\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_academic_subheadings\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_why_train_bullets\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_experience_content\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_teaching_philosophy\`;`)
  await db.run(sql`DROP TABLE \`workshop_details\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`shipping_addresses_id\` integer,
  	\`orders_id\` integer,
  	\`products_id\` integer,
  	\`blogs_id\` integer,
  	\`media_id\` integer,
  	\`home_page_id\` integer,
  	\`resources_id\` integer,
  	\`3d_simulation_id\` integer,
  	\`contact_page_id\` integer,
  	\`contact_submissions_id\` integer,
  	\`products_page_id\` integer,
  	\`customized_model_page_id\` integer,
  	\`customized_model_submissions_id\` integer,
  	\`workshops_page_id\` integer,
  	\`training_courses_page_id\` integer,
  	\`lead_submissions_id\` integer,
  	\`learning_bites_page_id\` integer,
  	\`carts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipping_addresses_id\`) REFERENCES \`shipping_addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blogs_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`home_page_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`resources_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`3d_simulation_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_page_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_submissions_id\`) REFERENCES \`contact_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_page_id\`) REFERENCES \`products_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customized_model_page_id\`) REFERENCES \`customized_model_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customized_model_submissions_id\`) REFERENCES \`customized_model_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`workshops_page_id\`) REFERENCES \`workshops_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`training_courses_page_id\`) REFERENCES \`training_courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lead_submissions_id\`) REFERENCES \`lead_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`learning_bites_page_id\`) REFERENCES \`learning_bites_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "orders_id", "products_id", "blogs_id", "media_id", "home_page_id", "resources_id", "3d_simulation_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "lead_submissions_id", "learning_bites_page_id", "carts_id") SELECT "id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "orders_id", "products_id", "blogs_id", "media_id", "home_page_id", "resources_id", "3d_simulation_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "lead_submissions_id", "learning_bites_page_id", "carts_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_shipping_addresses_id_idx\` ON \`payload_locked_documents_rels\` (\`shipping_addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blogs_id_idx\` ON \`payload_locked_documents_rels\` (\`blogs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_home_page_id_idx\` ON \`payload_locked_documents_rels\` (\`home_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_resources_id_idx\` ON \`payload_locked_documents_rels\` (\`resources_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_3d_simulation_id_idx\` ON \`payload_locked_documents_rels\` (\`3d_simulation_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_page_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_page_id_idx\` ON \`payload_locked_documents_rels\` (\`products_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customized_model_page_id_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customized_model_submissio_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_workshops_page_id_idx\` ON \`payload_locked_documents_rels\` (\`workshops_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_training_courses_page_id_idx\` ON \`payload_locked_documents_rels\` (\`training_courses_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lead_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_learning_bites_page_id_idx\` ON \`payload_locked_documents_rels\` (\`learning_bites_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
}
