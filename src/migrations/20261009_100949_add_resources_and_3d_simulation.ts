import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_filter_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`key\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_filter_tabs_order_idx\` ON \`resources_filter_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_filter_tabs_parent_id_idx\` ON \`resources_filter_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text DEFAULT 'workshop' NOT NULL,
  	\`badge_text\` text,
  	\`badge_color\` text DEFAULT 'orange',
  	\`year_or_vol\` text,
  	\`description\` text,
  	\`view_pdf_text\` text DEFAULT 'View PDF',
  	\`view_pdf_link\` text DEFAULT '#',
  	\`download_pdf_text\` text DEFAULT 'Download PDF',
  	\`download_pdf_link\` text DEFAULT '#',
  	\`download_file_id\` integer,
  	\`spine_badge_tag\` text,
  	\`spine_title\` text,
  	\`spine_bg\` text DEFAULT 'purple',
  	FOREIGN KEY (\`download_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_documents_order_idx\` ON \`resources_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_documents_parent_id_idx\` ON \`resources_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_documents_download_file_idx\` ON \`resources_documents\` (\`download_file_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_resources_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`crumb_home_text\` text DEFAULT 'Home',
  	\`crumb_current_text\` text DEFAULT '3D Simulation',
  	\`title\` text DEFAULT 'Why 3D Simulation Models',
  	\`description\` text DEFAULT 'Everything surgeons ask us about the models — why they work, what they''re made of, and every procedure that can be performed on them.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_resources_hero_order_idx\` ON \`3d_simulation_blocks_resources_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_resources_hero_parent_id_idx\` ON \`3d_simulation_blocks_resources_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_resources_hero_path_idx\` ON \`3d_simulation_blocks_resources_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_why_simulation_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation_blocks_why_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_why_simulation_points_order_idx\` ON \`3d_simulation_blocks_why_simulation_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_why_simulation_points_parent_id_idx\` ON \`3d_simulation_blocks_why_simulation_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_why_simulation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Why 3D Simulation Models',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_why_simulation_order_idx\` ON \`3d_simulation_blocks_why_simulation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_why_simulation_parent_id_idx\` ON \`3d_simulation_blocks_why_simulation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_why_simulation_path_idx\` ON \`3d_simulation_blocks_why_simulation\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_model_features_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation_blocks_model_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_model_features_features_order_idx\` ON \`3d_simulation_blocks_model_features_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_model_features_features_parent_id_idx\` ON \`3d_simulation_blocks_model_features_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_model_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT '3D Simulation Bone Model Features',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_model_features_order_idx\` ON \`3d_simulation_blocks_model_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_model_features_parent_id_idx\` ON \`3d_simulation_blocks_model_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_model_features_path_idx\` ON \`3d_simulation_blocks_model_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation_blocks_temporal_bone_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures_procedures_order_idx\` ON \`3d_simulation_blocks_temporal_bone_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures_procedures_parent_id_idx\` ON \`3d_simulation_blocks_temporal_bone_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Procedures That Can Be Performed Using the Temporal Bone Model',
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_lab1.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures_order_idx\` ON \`3d_simulation_blocks_temporal_bone_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures_parent_id_idx\` ON \`3d_simulation_blocks_temporal_bone_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures_path_idx\` ON \`3d_simulation_blocks_temporal_bone_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_temporal_bone_procedures_image_idx\` ON \`3d_simulation_blocks_temporal_bone_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation_blocks_sinus_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures_procedures_order_idx\` ON \`3d_simulation_blocks_sinus_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures_procedures_parent_id_idx\` ON \`3d_simulation_blocks_sinus_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Procedures on the Paranasal Sinus Model',
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_lab2.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures_order_idx\` ON \`3d_simulation_blocks_sinus_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures_parent_id_idx\` ON \`3d_simulation_blocks_sinus_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures_path_idx\` ON \`3d_simulation_blocks_sinus_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_sinus_procedures_image_idx\` ON \`3d_simulation_blocks_sinus_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation_blocks_larynx_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures_procedures_order_idx\` ON \`3d_simulation_blocks_larynx_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures_procedures_parent_id_idx\` ON \`3d_simulation_blocks_larynx_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Procedures on the Larynx Model',
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_micro.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures_order_idx\` ON \`3d_simulation_blocks_larynx_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures_parent_id_idx\` ON \`3d_simulation_blocks_larynx_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures_path_idx\` ON \`3d_simulation_blocks_larynx_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_larynx_procedures_image_idx\` ON \`3d_simulation_blocks_larynx_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_variants_variants_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation_blocks_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_variants_variants_list_order_idx\` ON \`3d_simulation_blocks_variants_variants_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_variants_variants_list_parent_id_idx\` ON \`3d_simulation_blocks_variants_variants_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Temporal Bone Variants Available',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_variants_order_idx\` ON \`3d_simulation_blocks_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_variants_parent_id_idx\` ON \`3d_simulation_blocks_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_variants_path_idx\` ON \`3d_simulation_blocks_variants\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation_blocks_doctor_acknowledgment\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Acknowledgment From a Globally Acclaimed Otolaryngologist',
  	\`quote\` text NOT NULL,
  	\`doctor_name\` text DEFAULT 'Dr. Milind Kirtane',
  	\`doctor_title\` text,
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_lab2.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`3d_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_doctor_acknowledgment_order_idx\` ON \`3d_simulation_blocks_doctor_acknowledgment\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_doctor_acknowledgment_parent_id_idx\` ON \`3d_simulation_blocks_doctor_acknowledgment\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_doctor_acknowledgment_path_idx\` ON \`3d_simulation_blocks_doctor_acknowledgment\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_blocks_doctor_acknowledgment_image_idx\` ON \`3d_simulation_blocks_doctor_acknowledgment\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`3d_simulation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT '3D Simulation Page' NOT NULL,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_keywords\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_updated_at_idx\` ON \`3d_simulation\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`3d_simulation_created_at_idx\` ON \`3d_simulation\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_resources_hero\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_why_simulation_points\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_why_simulation\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_model_features_features\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_model_features\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_temporal_bone_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_temporal_bone_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_sinus_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_sinus_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_larynx_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_larynx_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_variants_variants_list\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_variants\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_blocks_doctor_acknowledgment\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new_resources\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Resource Library & PDF Catalogues' NOT NULL,
  	\`hero_crumb_home_text\` text DEFAULT 'Home',
  	\`hero_crumb_category_text\` text DEFAULT 'Resources',
  	\`hero_crumb_current_text\` text DEFAULT 'Brochures & Catalogues',
  	\`hero_title\` text DEFAULT 'Resource Library & PDF Catalogues',
  	\`hero_description\` text DEFAULT 'Access and download verified educational materials, curriculum modules, and technical brochures for ProGuide''s Otolaryngology Head & Neck 3D simulation models and hands-on dissection workshops.',
  	\`hero_direct_pdf_download_text\` text DEFAULT 'Direct PDF Download',
  	\`hero_direct_pdf_download_link\` text DEFAULT '#',
  	\`hero_instant_viewer_text\` text DEFAULT 'Instant In-Browser Viewer',
  	\`hero_instant_viewer_link\` text DEFAULT '#',
  	\`section_header_title\` text DEFAULT 'Official ProGuide Brochures & Documents',
  	\`section_header_subtitle\` text DEFAULT 'Review the comprehensive course itineraries, surgical dissection station setups, and complete product dimension tables.',
  	\`section_header_download_all_text\` text DEFAULT 'Download All Package (.zip)',
  	\`section_header_download_all_link\` text DEFAULT '#',
  	\`cta_banner_title\` text DEFAULT 'Require Institutional Course Packages or Printed Physical Catalogues?',
  	\`cta_banner_subtitle\` text DEFAULT 'ProGuide coordinates with ENT departments, teaching hospitals, and surgical skill labs worldwide to provide customized bulk models, workshop facilitation kits, and printed course syllabi.',
  	\`cta_banner_primary_btn_text\` text DEFAULT 'Request Call Back',
  	\`cta_banner_primary_btn_link\` text DEFAULT '/contact',
  	\`cta_banner_secondary_btn_text\` text DEFAULT 'Email Programme Co-ordinator',
  	\`cta_banner_secondary_btn_link\` text DEFAULT 'mailto:info@pro-guide.in',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_resources\`("id", "title", "updated_at", "created_at") SELECT "id", "title", "updated_at", "created_at" FROM \`resources\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources\`;`)
  await db.run(sql`ALTER TABLE \`__new_resources\` RENAME TO \`resources\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_updated_at_idx\` ON \`resources\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_created_at_idx\` ON \`resources\` (\`created_at\`);`)
  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`3d_simulation_id\` integer REFERENCES \`3d_simulation\`(\`id\`);`)
  } catch (e) {}
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_3d_simulation_id_idx\` ON \`payload_locked_documents_rels\` (\`3d_simulation_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_resources_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`crumb_home_text\` text DEFAULT 'Home',
  	\`crumb_current_text\` text DEFAULT 'Resources',
  	\`title\` text DEFAULT 'Why 3D Simulation Models',
  	\`description\` text DEFAULT 'Everything surgeons ask us about the models — why they work, what they''re made of, and every procedure that can be performed on them.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_resources_hero_order_idx\` ON \`resources_blocks_resources_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_resources_hero_parent_id_idx\` ON \`resources_blocks_resources_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_resources_hero_path_idx\` ON \`resources_blocks_resources_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_why_simulation_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_why_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_why_simulation_points_order_idx\` ON \`resources_blocks_why_simulation_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_why_simulation_points_parent_id_idx\` ON \`resources_blocks_why_simulation_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_why_simulation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Why 3D Simulation Models',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_why_simulation_order_idx\` ON \`resources_blocks_why_simulation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_why_simulation_parent_id_idx\` ON \`resources_blocks_why_simulation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_why_simulation_path_idx\` ON \`resources_blocks_why_simulation\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_model_features_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_model_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_model_features_features_order_idx\` ON \`resources_blocks_model_features_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_model_features_features_parent_id_idx\` ON \`resources_blocks_model_features_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_model_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT '3D Simulation Bone Model Features',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_model_features_order_idx\` ON \`resources_blocks_model_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_model_features_parent_id_idx\` ON \`resources_blocks_model_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_model_features_path_idx\` ON \`resources_blocks_model_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_temporal_bone_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_temporal_bone_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_temporal_bone_procedures_procedures_order_idx\` ON \`resources_blocks_temporal_bone_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_temporal_bone_procedures_procedures_parent_id_idx\` ON \`resources_blocks_temporal_bone_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_temporal_bone_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Procedures That Can Be Performed Using the Temporal Bone Model',
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_lab1.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_temporal_bone_procedures_order_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_temporal_bone_procedures_parent_id_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_temporal_bone_procedures_path_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_temporal_bone_procedures_image_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_sinus_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_sinus_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_sinus_procedures_procedures_order_idx\` ON \`resources_blocks_sinus_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_sinus_procedures_procedures_parent_id_idx\` ON \`resources_blocks_sinus_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_sinus_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Procedures on the Paranasal Sinus Model',
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_lab2.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_sinus_procedures_order_idx\` ON \`resources_blocks_sinus_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_sinus_procedures_parent_id_idx\` ON \`resources_blocks_sinus_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_sinus_procedures_path_idx\` ON \`resources_blocks_sinus_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_sinus_procedures_image_idx\` ON \`resources_blocks_sinus_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_larynx_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_larynx_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_larynx_procedures_procedures_order_idx\` ON \`resources_blocks_larynx_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_larynx_procedures_procedures_parent_id_idx\` ON \`resources_blocks_larynx_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_larynx_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Procedures on the Larynx Model',
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_micro.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_larynx_procedures_order_idx\` ON \`resources_blocks_larynx_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_larynx_procedures_parent_id_idx\` ON \`resources_blocks_larynx_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_larynx_procedures_path_idx\` ON \`resources_blocks_larynx_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_larynx_procedures_image_idx\` ON \`resources_blocks_larynx_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_variants_variants_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_variants_variants_list_order_idx\` ON \`resources_blocks_variants_variants_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_variants_variants_list_parent_id_idx\` ON \`resources_blocks_variants_variants_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Temporal Bone Variants Available',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_variants_order_idx\` ON \`resources_blocks_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_variants_parent_id_idx\` ON \`resources_blocks_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_variants_path_idx\` ON \`resources_blocks_variants\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`resources_blocks_doctor_acknowledgment\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Acknowledgment From a Globally Acclaimed Otolaryngologist',
  	\`quote\` text NOT NULL,
  	\`doctor_name\` text DEFAULT 'Dr. Milind Kirtane',
  	\`doctor_title\` text,
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/photo_lab2.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_doctor_acknowledgment_order_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_doctor_acknowledgment_parent_id_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_doctor_acknowledgment_path_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_blocks_doctor_acknowledgment_image_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`image_id\`);`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_filter_tabs\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources_documents\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_resources_hero\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_why_simulation_points\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_why_simulation\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_model_features_features\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_model_features\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_temporal_bone_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_temporal_bone_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_sinus_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_sinus_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_larynx_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_larynx_procedures\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_variants_variants_list\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_variants\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation_blocks_doctor_acknowledgment\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`3d_simulation\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`shipping_addresses_id\` integer,
  	\`orders_id\` integer,
  	\`products_id\` integer,
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
  	\`lead_submissions_id\` integer,
  	\`learning_bites_page_id\` integer,
  	\`carts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipping_addresses_id\`) REFERENCES \`shipping_addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
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
  	FOREIGN KEY (\`lead_submissions_id\`) REFERENCES \`lead_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`learning_bites_page_id\`) REFERENCES \`learning_bites_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "orders_id", "products_id", "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "lead_submissions_id", "learning_bites_page_id", "carts_id") SELECT "id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "orders_id", "products_id", "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "lead_submissions_id", "learning_bites_page_id", "carts_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_shipping_addresses_id_idx\` ON \`payload_locked_documents_rels\` (\`shipping_addresses_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_home_page_id_idx\` ON \`payload_locked_documents_rels\` (\`home_page_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_resources_id_idx\` ON \`payload_locked_documents_rels\` (\`resources_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_contact_page_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_page_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_products_page_id_idx\` ON \`payload_locked_documents_rels\` (\`products_page_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_customized_model_page_id_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_page_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_customized_model_submissio_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_submissions_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_workshops_page_id_idx\` ON \`payload_locked_documents_rels\` (\`workshops_page_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_training_courses_page_id_idx\` ON \`payload_locked_documents_rels\` (\`training_courses_page_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_lead_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_submissions_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_learning_bites_page_id_idx\` ON \`payload_locked_documents_rels\` (\`learning_bites_page_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new_resources\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Resources Page' NOT NULL,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_keywords\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_resources\`("id", "title", "seo_title", "seo_description", "seo_keywords", "updated_at", "created_at") SELECT "id", "title", "seo_title", "seo_description", "seo_keywords", "updated_at", "created_at" FROM \`resources\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`resources\`;`)
  await db.run(sql`ALTER TABLE \`__new_resources\` RENAME TO \`resources\`;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_updated_at_idx\` ON \`resources\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`resources_created_at_idx\` ON \`resources\` (\`created_at\`);`)
}
