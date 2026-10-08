import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`orders_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product\` text,
  	\`product_name\` text NOT NULL,
  	\`product_image\` text,
  	\`sku\` text,
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`total_price\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_items_order_idx\` ON \`orders_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_parent_id_idx\` ON \`orders_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order_number\` text NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`shipping_address_full_name\` text NOT NULL,
  	\`shipping_address_phone\` text,
  	\`shipping_address_address_line1\` text NOT NULL,
  	\`shipping_address_address_line2\` text,
  	\`shipping_address_city\` text NOT NULL,
  	\`shipping_address_state\` text NOT NULL,
  	\`shipping_address_postal_code\` text NOT NULL,
  	\`shipping_address_country\` text DEFAULT 'India' NOT NULL,
  	\`billing_address_full_name\` text NOT NULL,
  	\`billing_address_phone\` text,
  	\`billing_address_address_line1\` text NOT NULL,
  	\`billing_address_address_line2\` text,
  	\`billing_address_city\` text NOT NULL,
  	\`billing_address_state\` text NOT NULL,
  	\`billing_address_postal_code\` text NOT NULL,
  	\`billing_address_country\` text DEFAULT 'India' NOT NULL,
  	\`pricing_subtotal\` numeric NOT NULL,
  	\`pricing_discount\` numeric DEFAULT 0,
  	\`pricing_shipping_amount\` numeric DEFAULT 0,
  	\`pricing_tax_amount\` numeric DEFAULT 0,
  	\`pricing_total_amount\` numeric NOT NULL,
  	\`pricing_currency\` text DEFAULT 'INR',
  	\`payment_status\` text DEFAULT 'pending',
  	\`order_status\` text DEFAULT 'confirmed',
  	\`payment\` text,
  	\`payment_method\` text DEFAULT 'COD',
  	\`order_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_user_idx\` ON \`orders\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_images_order_idx\` ON \`products_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_images_parent_id_idx\` ON \`products_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_images_image_idx\` ON \`products_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_why_choose\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`point\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_why_choose_order_idx\` ON \`products_why_choose\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_why_choose_parent_id_idx\` ON \`products_why_choose\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_sample_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_sample_list_order_idx\` ON \`products_sample_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_sample_list_parent_id_idx\` ON \`products_sample_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`category\` text,
  	\`sku\` text,
  	\`short_description\` text,
  	\`variant\` text DEFAULT 'Available in Left and Right variant',
  	\`image_url\` text,
  	\`image_id\` integer,
  	\`detail_heading\` text,
  	\`detail_paragraph1\` text,
  	\`detail_paragraph2\` text,
  	\`lining\` text,
  	\`specifications_weight\` text,
  	\`specifications_dimensions\` text,
  	\`specifications_material\` text,
  	\`specifications_variant\` text,
  	\`specifications_compatibility\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_image_idx\` ON \`products\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE IF EXISTS \`checkout_submissions_items\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`checkout_submissions\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`__new_payload_locked_documents_rels\`;`)
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
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "orders_id", "products_id", "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "lead_submissions_id", "carts_id") SELECT "id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", null, null, "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "lead_submissions_id", "carts_id" FROM \`payload_locked_documents_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lead_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`checkout_submissions_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`subtotal\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`checkout_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`checkout_submissions_items_order_idx\` ON \`checkout_submissions_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`checkout_submissions_items_parent_id_idx\` ON \`checkout_submissions_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`checkout_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`full_name\` text,
  	\`first_name\` text NOT NULL,
  	\`last_name\` text NOT NULL,
  	\`company_name\` text,
  	\`phone\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`country\` text DEFAULT 'India' NOT NULL,
  	\`province\` text NOT NULL,
  	\`street_address1\` text NOT NULL,
  	\`street_address2\` text,
  	\`city\` text NOT NULL,
  	\`postcode\` text NOT NULL,
  	\`order_notes\` text,
  	\`subtotal\` numeric,
  	\`shipping\` text DEFAULT 'Free shipping',
  	\`gst\` numeric,
  	\`total\` numeric,
  	\`status\` text DEFAULT 'Pending',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`checkout_submissions_updated_at_idx\` ON \`checkout_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`checkout_submissions_created_at_idx\` ON \`checkout_submissions\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE \`orders_items\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`DROP TABLE \`products_images\`;`)
  await db.run(sql`DROP TABLE \`products_why_choose\`;`)
  await db.run(sql`DROP TABLE \`products_sample_list\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
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
  	\`carts_id\` integer,
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
  	FOREIGN KEY (\`lead_submissions_id\`) REFERENCES \`lead_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", "checkout_submissions_id", "lead_submissions_id", "carts_id") SELECT "id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "media_id", "home_page_id", "resources_id", "contact_page_id", "contact_submissions_id", "products_page_id", "customized_model_page_id", "customized_model_submissions_id", "workshops_page_id", "training_courses_page_id", null, "lead_submissions_id", "carts_id" FROM \`payload_locked_documents_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
}
