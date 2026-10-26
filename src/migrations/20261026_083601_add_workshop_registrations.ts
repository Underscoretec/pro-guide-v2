import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`workshop_registrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`workshop_slug\` text NOT NULL,
  	\`workshop_title\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`workshop_registrations_user_idx\` ON \`workshop_registrations\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_workshop_slug_idx\` ON \`workshop_registrations\` (\`workshop_slug\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_updated_at_idx\` ON \`workshop_registrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_created_at_idx\` ON \`workshop_registrations\` (\`created_at\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`logo_url\` text DEFAULT '/images/logo_white.svg',
  	\`quick_links_title\` text DEFAULT 'Quick Links',
  	\`indian_query_title\` text DEFAULT 'Contacts for Indian Queries',
  	\`indian_query_name\` text DEFAULT 'Shelly Sequeira',
  	\`indian_query_email\` text DEFAULT 'shelly@knowledgebridgeint.com',
  	\`indian_query_phone\` text DEFAULT '9220522294',
  	\`international_query_title\` text DEFAULT 'Contacts for International Queries',
  	\`international_query_name\` text DEFAULT 'Shashikumar Sambhoo',
  	\`international_query_email\` text DEFAULT 'svs@knowledgebridgeint.com',
  	\`international_query_phone\` text DEFAULT '+971 507863903 | +91 9820454543',
  	\`address_title\` text DEFAULT 'Address',
  	\`address_text\` text DEFAULT '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East). Mumbai-400059, Maharashtra, India',
  	\`about\` text DEFAULT 'ProGuide is dedicated to equipping individuals, businesses, and organizations with the skills needed for the future by providing accessible and affordable high-quality education. Through collaborations with leading institutions and industry experts, ProGuide offers a wide range of courses, certifications, and professional programs designed to enhance career growth and business success.',
  	\`copyright\` text DEFAULT '© 2026. All Rights Reserved · 3D simulation models by OSSA PLUS SIMULATION LLP — ossaplussim.com',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer\`("id", "logo_id", "logo_url", "quick_links_title", "indian_query_title", "indian_query_name", "indian_query_email", "indian_query_phone", "international_query_title", "international_query_name", "international_query_email", "international_query_phone", "address_title", "address_text", "about", "copyright", "updated_at", "created_at") SELECT "id", "logo_id", "logo_url", "quick_links_title", "indian_query_title", "indian_query_name", "indian_query_email", "indian_query_phone", "international_query_title", "international_query_name", "international_query_email", "international_query_phone", "address_title", "address_text", "about", "copyright", "updated_at", "created_at" FROM \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer\` RENAME TO \`footer\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`footer_logo_idx\` ON \`footer\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`workshop_registrations_id\` integer REFERENCES workshop_registrations(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_workshop_registrations_id_idx\` ON \`payload_locked_documents_rels\` (\`workshop_registrations_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`workshop_registrations\`;`)
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
  	\`workshop_details_id\` integer,
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
  	FOREIGN KEY (\`workshop_details_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`training_courses_page_id\`) REFERENCES \`training_courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lead_submissions_id\`) REFERENCES \`lead_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`learning_bites_page_id\`) REFERENCES \`learning_bites_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "orders_id", "products_id", "blogs_id", "media_id", "home_page_id", "resources_id", "3d_simulation_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "workshop_details_id", "training_courses_page_id", "lead_submissions_id", "learning_bites_page_id", "carts_id") SELECT "id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "orders_id", "products_id", "blogs_id", "media_id", "home_page_id", "resources_id", "3d_simulation_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "workshop_details_id", "training_courses_page_id", "lead_submissions_id", "learning_bites_page_id", "carts_id" FROM \`payload_locked_documents_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_workshop_details_id_idx\` ON \`payload_locked_documents_rels\` (\`workshop_details_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_training_courses_page_id_idx\` ON \`payload_locked_documents_rels\` (\`training_courses_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lead_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_learning_bites_page_id_idx\` ON \`payload_locked_documents_rels\` (\`learning_bites_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`logo_url\` text DEFAULT '/images/logo_white.svg',
  	\`quick_links_title\` text DEFAULT 'Quick Links',
  	\`indian_query_title\` text DEFAULT 'Contacts for Indian Queries',
  	\`indian_query_name\` text DEFAULT 'Shelly Sequeira',
  	\`indian_query_email\` text DEFAULT 'shelly@knowledgebridgeint.com',
  	\`indian_query_phone\` text DEFAULT '9220522294',
  	\`international_query_title\` text DEFAULT 'Contacts for International Queries',
  	\`international_query_name\` text DEFAULT 'Shashikumar Sambhoo',
  	\`international_query_email\` text DEFAULT 'svs@knowledgebridgeint.com',
  	\`international_query_phone\` text DEFAULT '+971 507863903 | +91 9820454543',
  	\`address_title\` text DEFAULT 'Address',
  	\`address_text\` text DEFAULT '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East). Mumbai-400059, Maharashtra, India',
  	\`about\` text DEFAULT 'ProGuide is dedicated to equipping individuals, businesses, and organizations with the skills needed for the future by providing accessible and affordable high-quality education. Through collaborations with leading institutions and industry experts, ProGuide offers a wide range of courses, certifications, and professional programs designed to enhance career growth and business success.',
  	\`copyright\` text DEFAULT '© 2026. All Rights Reserved · 3D simulation models by OSSA PLUS SIMULATION LLP — ossa.sudors.in',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer\`("id", "logo_id", "logo_url", "quick_links_title", "indian_query_title", "indian_query_name", "indian_query_email", "indian_query_phone", "international_query_title", "international_query_name", "international_query_email", "international_query_phone", "address_title", "address_text", "about", "copyright", "updated_at", "created_at") SELECT "id", "logo_id", "logo_url", "quick_links_title", "indian_query_title", "indian_query_name", "indian_query_email", "indian_query_phone", "international_query_title", "international_query_name", "international_query_email", "international_query_phone", "address_title", "address_text", "about", "copyright", "updated_at", "created_at" FROM \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer\` RENAME TO \`footer\`;`)
  await db.run(sql`CREATE INDEX \`footer_logo_idx\` ON \`footer\` (\`logo_id\`);`)
}
