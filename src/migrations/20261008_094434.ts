import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'user' NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`phone_number\` text,
  	\`institution\` text,
  	\`redeem_code\` text,
  	\`is_email_verified\` integer DEFAULT false,
  	\`is_phone_verified\` integer DEFAULT false,
  	\`email_otp_hash\` text,
  	\`email_otp_expires_at\` text,
  	\`phone_otp_hash\` text,
  	\`phone_otp_expires_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_redeem_code_idx\` ON \`users\` (\`redeem_code\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`shipping_addresses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`address_line\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`state\` text NOT NULL,
  	\`postal_code\` text NOT NULL,
  	\`country\` text DEFAULT 'India' NOT NULL,
  	\`delivery_notes\` text,
  	\`is_default\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`shipping_addresses_user_idx\` ON \`shipping_addresses\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`shipping_addresses_updated_at_idx\` ON \`shipping_addresses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`shipping_addresses_created_at_idx\` ON \`shipping_addresses\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_hero_ticks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_ticks_order_idx\` ON \`home_page_blocks_hero_ticks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_ticks_parent_id_idx\` ON \`home_page_blocks_hero_ticks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_hero_carousel_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_carousel_images_order_idx\` ON \`home_page_blocks_hero_carousel_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_carousel_images_parent_id_idx\` ON \`home_page_blocks_hero_carousel_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_carousel_images_image_idx\` ON \`home_page_blocks_hero_carousel_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text DEFAULT 'Otolaryngology Head & Neck 3D Simulation Models' NOT NULL,
  	\`lede\` text DEFAULT 'Simulation surgery models for learning the surgeries in a hygienic & easier way! KnowledgeBridge International is a tech knowledge company developing market-leading, innovative tools in collaboration with the medical community.' NOT NULL,
  	\`primary_c_t_a_text\` text DEFAULT 'Explore Products',
  	\`primary_c_t_a_link\` text DEFAULT '#products',
  	\`secondary_c_t_a_text\` text DEFAULT 'Explore Workshops',
  	\`secondary_c_t_a_link\` text DEFAULT '#workshops',
  	\`main_image_id\` integer,
  	\`main_image_url\` text DEFAULT '/images/ws_guide2.jpg',
  	\`card_image1_id\` integer,
  	\`card_image1_url\` text DEFAULT '/images/prod1.jpg',
  	\`card_image2_id\` integer,
  	\`card_image2_url\` text DEFAULT '/images/prod3.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`main_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`card_image1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`card_image2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_order_idx\` ON \`home_page_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_parent_id_idx\` ON \`home_page_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_path_idx\` ON \`home_page_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_main_image_idx\` ON \`home_page_blocks_hero\` (\`main_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_card_image1_idx\` ON \`home_page_blocks_hero\` (\`card_image1_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_hero_card_image2_idx\` ON \`home_page_blocks_hero\` (\`card_image2_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_partners_partners_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`logo_url\` text,
  	\`name\` text,
  	\`link\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_partners_partners_list_order_idx\` ON \`home_page_blocks_partners_partners_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_partners_partners_list_parent_id_idx\` ON \`home_page_blocks_partners_partners_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_partners_partners_list_logo_idx\` ON \`home_page_blocks_partners_partners_list\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_partners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Partnerships with top institutes to make world-class education accessible globally' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_partners_order_idx\` ON \`home_page_blocks_partners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_partners_parent_id_idx\` ON \`home_page_blocks_partners\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_partners_path_idx\` ON \`home_page_blocks_partners\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_products_products_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`variant\` text DEFAULT 'Available in Left and Right variant',
  	\`price\` text NOT NULL,
  	\`gst_note\` text DEFAULT '+ 18% GST',
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	\`cart_url\` text DEFAULT 'https://pro-guide.in/',
  	\`details_url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_products_products_list_order_idx\` ON \`home_page_blocks_products_products_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_products_products_list_parent_id_idx\` ON \`home_page_blocks_products_products_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_products_products_list_image_idx\` ON \`home_page_blocks_products_products_list\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_products\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Product Offerings' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_products_order_idx\` ON \`home_page_blocks_products\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_products_parent_id_idx\` ON \`home_page_blocks_products\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_products_path_idx\` ON \`home_page_blocks_products\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_true_to_life_details_details_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_true_to_life_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_true_to_life_details_details_list_order_idx\` ON \`home_page_blocks_true_to_life_details_details_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_true_to_life_details_details_list_parent_id_idx\` ON \`home_page_blocks_true_to_life_details_details_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_true_to_life_details_details_list_image_idx\` ON \`home_page_blocks_true_to_life_details_details_list\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_true_to_life_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Every Detail, True to Life' NOT NULL,
  	\`subtitle\` text DEFAULT 'Straight from our bench — unretouched photographs of the models our delegates train on.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_true_to_life_details_order_idx\` ON \`home_page_blocks_true_to_life_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_true_to_life_details_parent_id_idx\` ON \`home_page_blocks_true_to_life_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_true_to_life_details_path_idx\` ON \`home_page_blocks_true_to_life_details\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_workshops_workshops_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`tagline\` text DEFAULT 'KBI SkillBridge',
  	\`meta\` text NOT NULL,
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	\`brochure_url\` text DEFAULT '/ProGuide_3D_Workshops_2026.pdf',
  	\`registration_url\` text DEFAULT 'https://pro-guide.in/',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_workshops\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshops_workshops_list_order_idx\` ON \`home_page_blocks_workshops_workshops_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshops_workshops_list_parent_id_idx\` ON \`home_page_blocks_workshops_workshops_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshops_workshops_list_image_idx\` ON \`home_page_blocks_workshops_workshops_list\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_workshops\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Explore Workshops' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshops_order_idx\` ON \`home_page_blocks_workshops\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshops_parent_id_idx\` ON \`home_page_blocks_workshops\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshops_path_idx\` ON \`home_page_blocks_workshops\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_workshop_glimpses_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_workshop_glimpses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshop_glimpses_gallery_order_idx\` ON \`home_page_blocks_workshop_glimpses_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshop_glimpses_gallery_parent_id_idx\` ON \`home_page_blocks_workshop_glimpses_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshop_glimpses_gallery_image_idx\` ON \`home_page_blocks_workshop_glimpses_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_workshop_glimpses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'Glimpses from our first KBI SkillBridge workshop',
  	\`title\` text DEFAULT 'Advanced Temporal Bone Dissection Workshop',
  	\`description\` text DEFAULT '2 October 2026 · KBI Skill Lab, Andheri East, Mumbai · Under the aegis of AOI Mumbai West, ahead of Mumbai Manthan 3.0 — every delegate drilled their own 3D temporal bone model under faculty guidance.',
  	\`collage_image_id\` integer,
  	\`collage_image_url\` text DEFAULT '/images/ws_collage.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`collage_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshop_glimpses_order_idx\` ON \`home_page_blocks_workshop_glimpses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshop_glimpses_parent_id_idx\` ON \`home_page_blocks_workshop_glimpses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshop_glimpses_path_idx\` ON \`home_page_blocks_workshop_glimpses\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_workshop_glimpses_collage_image_idx\` ON \`home_page_blocks_workshop_glimpses\` (\`collage_image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_why_artificial_bone_check_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_why_artificial_bone\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_check_list_order_idx\` ON \`home_page_blocks_why_artificial_bone_check_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_check_list_parent_id_idx\` ON \`home_page_blocks_why_artificial_bone_check_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_why_artificial_bone_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_why_artificial_bone\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_stats_order_idx\` ON \`home_page_blocks_why_artificial_bone_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_stats_parent_id_idx\` ON \`home_page_blocks_why_artificial_bone_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_why_artificial_bone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Why Artificial Bone',
  	\`image_id\` integer,
  	\`image_url\` text DEFAULT '/images/detail_macro.jpg',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_order_idx\` ON \`home_page_blocks_why_artificial_bone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_parent_id_idx\` ON \`home_page_blocks_why_artificial_bone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_path_idx\` ON \`home_page_blocks_why_artificial_bone\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_why_artificial_bone_image_idx\` ON \`home_page_blocks_why_artificial_bone\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_faculty_faculty_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`initials\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`bio\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_faculty\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_faculty_list_order_idx\` ON \`home_page_blocks_faculty_faculty_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_faculty_list_parent_id_idx\` ON \`home_page_blocks_faculty_faculty_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_faculty\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'World-Class Faculty',
  	\`subtitle\` text DEFAULT 'Learn from faculty members who bring a blend of theory and practice, and real-world examples relevant to your learning experience.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_order_idx\` ON \`home_page_blocks_faculty\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_parent_id_idx\` ON \`home_page_blocks_faculty\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_path_idx\` ON \`home_page_blocks_faculty\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_testimonials_feedback_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_feedback_list_order_idx\` ON \`home_page_blocks_testimonials_feedback_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_feedback_list_parent_id_idx\` ON \`home_page_blocks_testimonials_feedback_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_testimonials_stories_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_stories_list_order_idx\` ON \`home_page_blocks_testimonials_stories_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_stories_list_parent_id_idx\` ON \`home_page_blocks_testimonials_stories_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feedback_title\` text DEFAULT 'Temporal Bone Dissection Workshop Feedback',
  	\`stories_title\` text DEFAULT 'What Our Learners Are Saying',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_order_idx\` ON \`home_page_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_parent_id_idx\` ON \`home_page_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_path_idx\` ON \`home_page_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_bone_variants_variants_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_bone_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_bone_variants_variants_list_order_idx\` ON \`home_page_blocks_bone_variants_variants_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_bone_variants_variants_list_parent_id_idx\` ON \`home_page_blocks_bone_variants_variants_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_bone_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Temporal Bone Variants',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_bone_variants_order_idx\` ON \`home_page_blocks_bone_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_bone_variants_parent_id_idx\` ON \`home_page_blocks_bone_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_bone_variants_path_idx\` ON \`home_page_blocks_bone_variants\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Let us guide you in your upskilling journey',
  	\`subtitle\` text DEFAULT 'Our programme experts are available 7 days a week. Fill the form and we will help you choose the right programme.',
  	\`submit_email\` text DEFAULT 'shelly@knowledgebridgeint.com',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_lead_form_order_idx\` ON \`home_page_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_lead_form_parent_id_idx\` ON \`home_page_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_lead_form_path_idx\` ON \`home_page_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_blog_posts_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`meta\` text DEFAULT 'By ProGuide Editorial · 5 min read',
  	\`image_id\` integer,
  	\`image_url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_blog_posts_list_order_idx\` ON \`home_page_blocks_blog_posts_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_blog_posts_list_parent_id_idx\` ON \`home_page_blocks_blog_posts_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_blog_posts_list_image_idx\` ON \`home_page_blocks_blog_posts_list\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text DEFAULT 'Catch the latest updates on',
  	\`title\` text DEFAULT 'The ProGuide Blog',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_blocks_blog_order_idx\` ON \`home_page_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_blog_parent_id_idx\` ON \`home_page_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_blog_path_idx\` ON \`home_page_blocks_blog\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Home' NOT NULL,
  	\`description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_keywords\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_updated_at_idx\` ON \`home_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`home_page_created_at_idx\` ON \`home_page\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_resources_hero\` (
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
  await db.run(sql`CREATE INDEX \`resources_blocks_resources_hero_order_idx\` ON \`resources_blocks_resources_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_resources_hero_parent_id_idx\` ON \`resources_blocks_resources_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_resources_hero_path_idx\` ON \`resources_blocks_resources_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_why_simulation_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_why_simulation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_why_simulation_points_order_idx\` ON \`resources_blocks_why_simulation_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_why_simulation_points_parent_id_idx\` ON \`resources_blocks_why_simulation_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_why_simulation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Why 3D Simulation Models',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_why_simulation_order_idx\` ON \`resources_blocks_why_simulation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_why_simulation_parent_id_idx\` ON \`resources_blocks_why_simulation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_why_simulation_path_idx\` ON \`resources_blocks_why_simulation\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_model_features_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_model_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_model_features_features_order_idx\` ON \`resources_blocks_model_features_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_model_features_features_parent_id_idx\` ON \`resources_blocks_model_features_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_model_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT '3D Simulation Bone Model Features',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_model_features_order_idx\` ON \`resources_blocks_model_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_model_features_parent_id_idx\` ON \`resources_blocks_model_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_model_features_path_idx\` ON \`resources_blocks_model_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_temporal_bone_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_temporal_bone_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_temporal_bone_procedures_procedures_order_idx\` ON \`resources_blocks_temporal_bone_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_temporal_bone_procedures_procedures_parent_id_idx\` ON \`resources_blocks_temporal_bone_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_temporal_bone_procedures\` (
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
  await db.run(sql`CREATE INDEX \`resources_blocks_temporal_bone_procedures_order_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_temporal_bone_procedures_parent_id_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_temporal_bone_procedures_path_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_temporal_bone_procedures_image_idx\` ON \`resources_blocks_temporal_bone_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_sinus_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_sinus_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_sinus_procedures_procedures_order_idx\` ON \`resources_blocks_sinus_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_sinus_procedures_procedures_parent_id_idx\` ON \`resources_blocks_sinus_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_sinus_procedures\` (
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
  await db.run(sql`CREATE INDEX \`resources_blocks_sinus_procedures_order_idx\` ON \`resources_blocks_sinus_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_sinus_procedures_parent_id_idx\` ON \`resources_blocks_sinus_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_sinus_procedures_path_idx\` ON \`resources_blocks_sinus_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_sinus_procedures_image_idx\` ON \`resources_blocks_sinus_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_larynx_procedures_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_larynx_procedures\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_larynx_procedures_procedures_order_idx\` ON \`resources_blocks_larynx_procedures_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_larynx_procedures_procedures_parent_id_idx\` ON \`resources_blocks_larynx_procedures_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_larynx_procedures\` (
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
  await db.run(sql`CREATE INDEX \`resources_blocks_larynx_procedures_order_idx\` ON \`resources_blocks_larynx_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_larynx_procedures_parent_id_idx\` ON \`resources_blocks_larynx_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_larynx_procedures_path_idx\` ON \`resources_blocks_larynx_procedures\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_larynx_procedures_image_idx\` ON \`resources_blocks_larynx_procedures\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_variants_variants_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_blocks_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_variants_variants_list_order_idx\` ON \`resources_blocks_variants_variants_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_variants_variants_list_parent_id_idx\` ON \`resources_blocks_variants_variants_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Temporal Bone Variants Available',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_blocks_variants_order_idx\` ON \`resources_blocks_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_variants_parent_id_idx\` ON \`resources_blocks_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_variants_path_idx\` ON \`resources_blocks_variants\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`resources_blocks_doctor_acknowledgment\` (
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
  await db.run(sql`CREATE INDEX \`resources_blocks_doctor_acknowledgment_order_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_doctor_acknowledgment_parent_id_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_doctor_acknowledgment_path_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`resources_blocks_doctor_acknowledgment_image_idx\` ON \`resources_blocks_doctor_acknowledgment\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`resources\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Resources Page' NOT NULL,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_keywords\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_updated_at_idx\` ON \`resources\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`resources_created_at_idx\` ON \`resources\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Get In Touch' NOT NULL,
  	\`hero_description\` text DEFAULT 'Have questions or need assistance? We''re here to help — workshops, models, bulk and institutional orders, or anything else.',
  	\`indian_queries_title\` text DEFAULT 'Contacts for Indian Queries',
  	\`indian_queries_name\` text DEFAULT 'Shelly Sequeira',
  	\`indian_queries_email\` text DEFAULT 'shelly@knowledgebridgeint.com',
  	\`indian_queries_phone\` text DEFAULT '9220522294',
  	\`international_queries_title\` text DEFAULT 'Contacts for International Queries',
  	\`international_queries_name\` text DEFAULT 'Shashikumar Sambhoo',
  	\`international_queries_email\` text DEFAULT 'svs@knowledgebridgeint.com',
  	\`international_queries_phone\` text DEFAULT '+971 507863903 | +91 9820454543',
  	\`address_title\` text DEFAULT 'Address',
  	\`address_text\` text DEFAULT '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East), Mumbai-400059, Maharashtra, India',
  	\`form_disclaimer\` text DEFAULT 'By clicking the button below, you agree to receive communications via Email/Call/WhatsApp/SMS from KnowledgeBridge about this programme and other relevant programmes.',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page_updated_at_idx\` ON \`contact_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_page_created_at_idx\` ON \`contact_page\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`first_name\` text NOT NULL,
  	\`last_name\` text,
  	\`country\` text,
  	\`mobile\` text,
  	\`message\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_submissions_updated_at_idx\` ON \`contact_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_submissions_created_at_idx\` ON \`contact_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_page_families_items_bullet_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`point\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_page_families_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_page_families_items_bullet_points_order_idx\` ON \`products_page_families_items_bullet_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_page_families_items_bullet_points_parent_id_idx\` ON \`products_page_families_items_bullet_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_page_families_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`badge\` text,
  	\`price\` numeric,
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`description\` text,
  	\`primary_button_text\` text DEFAULT 'Buy / Enquire',
  	\`primary_button_link\` text DEFAULT 'https://pro-guide.in/',
  	\`secondary_button_text\` text,
  	\`secondary_button_link\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_page_families\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_page_families_items_order_idx\` ON \`products_page_families_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_page_families_items_parent_id_idx\` ON \`products_page_families_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_page_families_items_image_idx\` ON \`products_page_families_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_page_families\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`family_id\` text,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`is_alt\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_page_families_order_idx\` ON \`products_page_families\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_page_families_parent_id_idx\` ON \`products_page_families\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_page_stage_comparison_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tier\` text NOT NULL,
  	\`models\` text NOT NULL,
  	\`built_for\` text NOT NULL,
  	\`typical_use\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_page_stage_comparison_tiers_order_idx\` ON \`products_page_stage_comparison_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_page_stage_comparison_tiers_parent_id_idx\` ON \`products_page_stage_comparison_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Product Offerings' NOT NULL,
  	\`hero_crumb_home_text\` text DEFAULT 'Home',
  	\`hero_crumb_current_text\` text DEFAULT 'Product Offerings',
  	\`hero_title\` text DEFAULT 'Product Offerings',
  	\`hero_description\` text DEFAULT 'The complete OSSA+ Simulations catalogue — ENT simulation models across otology, rhinology, laryngology and vestibular training, cast in OSSA+ Composite™ by OSSA PLUS SIMULATION LLP. Store items can be purchased right away; everything else is a quick enquiry away.',
  	\`stage_comparison_title\` text DEFAULT 'Choose by Training Stage',
  	\`stage_comparison_footer_note\` text DEFAULT 'Full model specifications and the material story are on ossa.sudors.in · purchases and quotes are handled here on ProGuide.',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`products_page_updated_at_idx\` ON \`products_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_page_created_at_idx\` ON \`products_page\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customized_model_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Get Your Own Customized 3D Simulated Model' NOT NULL,
  	\`hero_description\` text DEFAULT 'We provide 3D simulated models as per your requirement. Fill in the details below and upload your DICOM file — our engineers will review the submission and get back to you within 48 working hours.',
  	\`dicom_help_text\` text DEFAULT 'dicom file (max. 50MB)',
  	\`dicom_format_info\` text DEFAULT 'Only DICOM (.dcom) files are supported. Minimum 0.6mm thick sections in all the three planes Sagittal, Axial, CORONAL',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`customized_model_page_updated_at_idx\` ON \`customized_model_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customized_model_page_created_at_idx\` ON \`customized_model_page\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customized_model_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`first_name\` text NOT NULL,
  	\`academic_qualification\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`i_message_no\` text NOT NULL,
  	\`whats_app_no\` text NOT NULL,
  	\`viber_no\` text NOT NULL,
  	\`institution_name\` text NOT NULL,
  	\`address\` text NOT NULL,
  	\`state\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`country\` text NOT NULL,
  	\`pincode\` text NOT NULL,
  	\`file_id\` integer,
  	\`file_name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`customized_model_submissions_file_idx\` ON \`customized_model_submissions\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`customized_model_submissions_updated_at_idx\` ON \`customized_model_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customized_model_submissions_created_at_idx\` ON \`customized_model_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`workshops_page_temporal_workshops\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`tagline\` text DEFAULT 'KBI SkillBridge',
  	\`meta\` text DEFAULT 'One-day, faculty-led hands-on · Dates & fees on registration',
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	\`brochure_file_id\` integer,
  	\`brochure_url\` text DEFAULT '/ProGuide_3D_Workshops_2026.pdf',
  	\`registration_url\` text DEFAULT 'https://pro-guide.in/',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`brochure_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshops_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshops_page_temporal_workshops_order_idx\` ON \`workshops_page_temporal_workshops\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_temporal_workshops_parent_id_idx\` ON \`workshops_page_temporal_workshops\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_temporal_workshops_image_idx\` ON \`workshops_page_temporal_workshops\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_temporal_workshops_brochure_file_idx\` ON \`workshops_page_temporal_workshops\` (\`brochure_file_id\`);`)
  await db.run(sql`CREATE TABLE \`workshops_page_sinus_workshops\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`tagline\` text DEFAULT 'KBI SkillBridge',
  	\`meta\` text DEFAULT 'One-day, faculty-led hands-on · Dates & fees on registration',
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	\`brochure_file_id\` integer,
  	\`brochure_url\` text DEFAULT '/ProGuide_3D_Workshops_2026.pdf',
  	\`registration_url\` text DEFAULT 'https://pro-guide.in/',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`brochure_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshops_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshops_page_sinus_workshops_order_idx\` ON \`workshops_page_sinus_workshops\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_sinus_workshops_parent_id_idx\` ON \`workshops_page_sinus_workshops\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_sinus_workshops_image_idx\` ON \`workshops_page_sinus_workshops\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_sinus_workshops_brochure_file_idx\` ON \`workshops_page_sinus_workshops\` (\`brochure_file_id\`);`)
  await db.run(sql`CREATE TABLE \`workshops_page_larynx_workshops\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`tagline\` text DEFAULT 'KBI SkillBridge',
  	\`meta\` text DEFAULT 'One-day, faculty-led hands-on · Dates & fees on registration',
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`alt\` text,
  	\`brochure_file_id\` integer,
  	\`brochure_url\` text DEFAULT '/ProGuide_3D_Workshops_2026.pdf',
  	\`registration_url\` text DEFAULT 'https://pro-guide.in/',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`brochure_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshops_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshops_page_larynx_workshops_order_idx\` ON \`workshops_page_larynx_workshops\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_larynx_workshops_parent_id_idx\` ON \`workshops_page_larynx_workshops\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_larynx_workshops_image_idx\` ON \`workshops_page_larynx_workshops\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_larynx_workshops_brochure_file_idx\` ON \`workshops_page_larynx_workshops\` (\`brochure_file_id\`);`)
  await db.run(sql`CREATE TABLE \`workshops_page_larynx_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshops_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workshops_page_larynx_stats_order_idx\` ON \`workshops_page_larynx_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_larynx_stats_parent_id_idx\` ON \`workshops_page_larynx_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workshops_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Explore Workshops' NOT NULL,
  	\`hero_description\` text DEFAULT 'Hands-on, station-based programmes where every delegate operates on their own model under faculty guidance. Registration and payment are handled on the ProGuide store.',
  	\`glimpses_image_id\` integer,
  	\`glimpses_image_url\` text DEFAULT '/images/ws_collage.jpg',
  	\`glimpses_caption\` text DEFAULT 'Our first KBI SkillBridge workshop — Advanced Temporal Bone Dissection, 2 October 2026 at the KBI Skill Lab, Andheri East, under the aegis of AOI Mumbai West, ahead of Mumbai Manthan 3.0.',
  	\`glimpses_brochure_file_id\` integer,
  	\`glimpses_brochure_url\` text DEFAULT '/ProGuide_3D_Workshops_2026.pdf',
  	\`temporal_heading\` text DEFAULT '3D Temporal Bone Workshops',
  	\`sinus_heading\` text DEFAULT 'Paranasal Sinus Workshops',
  	\`larynx_heading\` text DEFAULT 'Microlaryngoscopy and Laser Surgeries',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`glimpses_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`glimpses_brochure_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`workshops_page_glimpses_glimpses_image_idx\` ON \`workshops_page\` (\`glimpses_image_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_glimpses_glimpses_brochure_file_idx\` ON \`workshops_page\` (\`glimpses_brochure_file_id\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_updated_at_idx\` ON \`workshops_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_created_at_idx\` ON \`workshops_page\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`training_courses_page_management_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`initials\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`bio\` text NOT NULL,
  	\`photo_id\` integer,
  	\`image_url\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`training_courses_page_management_team_order_idx\` ON \`training_courses_page_management_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_management_team_parent_id_idx\` ON \`training_courses_page_management_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_management_team_photo_idx\` ON \`training_courses_page_management_team\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`training_courses_page_courses_procedures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_courses_page_courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`training_courses_page_courses_procedures_order_idx\` ON \`training_courses_page_courses_procedures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_courses_procedures_parent_id_idx\` ON \`training_courses_page_courses_procedures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`training_courses_page_courses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`why\` text NOT NULL,
  	\`fmt\` text NOT NULL,
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`brochure_file_id\` integer,
  	\`brochure_url\` text DEFAULT '/ProGuide_3D_Workshops_2026.pdf',
  	\`registration_url\` text DEFAULT 'https://pro-guide.in/',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`brochure_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`training_courses_page_courses_order_idx\` ON \`training_courses_page_courses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_courses_parent_id_idx\` ON \`training_courses_page_courses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_courses_image_idx\` ON \`training_courses_page_courses\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_courses_brochure_file_idx\` ON \`training_courses_page_courses\` (\`brochure_file_id\`);`)
  await db.run(sql`CREATE TABLE \`training_courses_page_why_artificial_bone_check_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`training_courses_page_why_artificial_bone_check_list_order_idx\` ON \`training_courses_page_why_artificial_bone_check_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_why_artificial_bone_check_list_parent_id_idx\` ON \`training_courses_page_why_artificial_bone_check_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`training_courses_page_why_artificial_bone_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_courses_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`training_courses_page_why_artificial_bone_stats_order_idx\` ON \`training_courses_page_why_artificial_bone_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_why_artificial_bone_stats_parent_id_idx\` ON \`training_courses_page_why_artificial_bone_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`training_courses_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'About Training Courses — 2026 Workshop Series' NOT NULL,
  	\`hero_description\` text DEFAULT 'We are dedicated to building surgical confidence and reducing complications through specialized presurgical training. Our workshops provide hands-on training on simulation models of the temporal bone, paranasal sinuses and larynx, designed specifically for practicing surgeons. Each session is led by esteemed faculty members who provide one-to-one guidance.',
  	\`management_team_title\` text DEFAULT 'The Management Team',
  	\`courses_series_title\` text DEFAULT '3D Surgical Simulation Workshops — 2026 Series',
  	\`courses_series_description\` text DEFAULT 'A comprehensive series of one-day, faculty-led, hands-on programs built on anatomically accurate 3D simulation models. Each workshop pairs live demonstration of every procedural step with supervised practice at fully equipped workstations — with one-to-one mentoring, continuous faculty feedback and participation certificates.',
  	\`why_artificial_bone_title\` text DEFAULT 'Why Artificial Bone',
  	\`why_artificial_bone_image_id\` integer,
  	\`why_artificial_bone_image_url\` text DEFAULT '/images/photo_micro.jpg',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`why_artificial_bone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`training_courses_page_why_artificial_bone_why_artificial_idx\` ON \`training_courses_page\` (\`why_artificial_bone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_updated_at_idx\` ON \`training_courses_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`training_courses_page_created_at_idx\` ON \`training_courses_page\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`lead_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`full_name\` text,
  	\`first_name\` text NOT NULL,
  	\`last_name\` text NOT NULL,
  	\`country\` text DEFAULT 'India',
  	\`mobile\` text NOT NULL,
  	\`source\` text DEFAULT 'Landing Page — Upskilling Journey',
  	\`status\` text DEFAULT 'New',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`lead_submissions_updated_at_idx\` ON \`lead_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lead_submissions_created_at_idx\` ON \`lead_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`learning_bites_page_video_list\` (
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
  await db.run(sql`CREATE INDEX \`learning_bites_page_video_list_order_idx\` ON \`learning_bites_page_video_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`learning_bites_page_video_list_parent_id_idx\` ON \`learning_bites_page_video_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`learning_bites_page_video_list_thumbnail_idx\` ON \`learning_bites_page_video_list\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`learning_bites_page\` (
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
  await db.run(sql`CREATE INDEX \`learning_bites_page_updated_at_idx\` ON \`learning_bites_page\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`learning_bites_page_created_at_idx\` ON \`learning_bites_page\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`carts_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`image_url\` text,
  	\`variant\` text,
  	\`subtotal\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`carts_items_order_idx\` ON \`carts_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`carts_items_parent_id_idx\` ON \`carts_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`carts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`total_items\` numeric DEFAULT 0,
  	\`subtotal\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`carts_user_idx\` ON \`carts\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`carts_updated_at_idx\` ON \`carts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`carts_created_at_idx\` ON \`carts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_learning_bites_page_id_idx\` ON \`payload_locked_documents_rels\` (\`learning_bites_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_dropdown_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_dropdown_items_order_idx\` ON \`header_nav_items_dropdown_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_dropdown_items_parent_id_idx\` ON \`header_nav_items_dropdown_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text,
  	\`has_dropdown\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`announcement_text\` text DEFAULT 'Unlock new opportunities by upskilling and stepping into a brighter future.' NOT NULL,
  	\`announcement_link_text\` text DEFAULT 'Explore Now!!' NOT NULL,
  	\`announcement_link_url\` text DEFAULT '/workshops' NOT NULL,
  	\`logo_id\` integer,
  	\`logo_url\` text DEFAULT '/images/logo.svg',
  	\`search_placeholder\` text DEFAULT 'What would you like to learn?',
  	\`buy_now_button_text\` text DEFAULT 'Buy Now',
  	\`buy_now_button_url\` text DEFAULT '/products',
  	\`cart_url\` text DEFAULT '/cart',
  	\`login_button_text\` text DEFAULT 'Login /Register',
  	\`login_button_url\` text DEFAULT 'https://pro-guide.in/',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_quick_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_quick_links_order_idx\` ON \`footer_quick_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_quick_links_parent_id_idx\` ON \`footer_quick_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_social_links_order_idx\` ON \`footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_social_links_parent_id_idx\` ON \`footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
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
  await db.run(sql`CREATE INDEX \`footer_logo_idx\` ON \`footer\` (\`logo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`shipping_addresses\`;`)
  await db.run(sql`DROP TABLE \`orders_items\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`DROP TABLE \`products_images\`;`)
  await db.run(sql`DROP TABLE \`products_why_choose\`;`)
  await db.run(sql`DROP TABLE \`products_sample_list\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_hero_ticks\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_hero_carousel_images\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_partners_partners_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_partners\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_products_products_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_products\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_true_to_life_details_details_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_true_to_life_details\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_workshops_workshops_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_workshops\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_workshop_glimpses_gallery\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_workshop_glimpses\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_why_artificial_bone_check_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_why_artificial_bone_stats\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_why_artificial_bone\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_faculty_faculty_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_faculty\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_testimonials_feedback_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_testimonials_stories_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_bone_variants_variants_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_bone_variants\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_blog_posts_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_blog\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_resources_hero\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_why_simulation_points\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_why_simulation\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_model_features_features\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_model_features\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_temporal_bone_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_temporal_bone_procedures\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_sinus_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_sinus_procedures\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_larynx_procedures_procedures\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_larynx_procedures\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_variants_variants_list\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_variants\`;`)
  await db.run(sql`DROP TABLE \`resources_blocks_doctor_acknowledgment\`;`)
  await db.run(sql`DROP TABLE \`resources\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`contact_submissions\`;`)
  await db.run(sql`DROP TABLE \`products_page_families_items_bullet_points\`;`)
  await db.run(sql`DROP TABLE \`products_page_families_items\`;`)
  await db.run(sql`DROP TABLE \`products_page_families\`;`)
  await db.run(sql`DROP TABLE \`products_page_stage_comparison_tiers\`;`)
  await db.run(sql`DROP TABLE \`products_page\`;`)
  await db.run(sql`DROP TABLE \`customized_model_page\`;`)
  await db.run(sql`DROP TABLE \`customized_model_submissions\`;`)
  await db.run(sql`DROP TABLE \`workshops_page_temporal_workshops\`;`)
  await db.run(sql`DROP TABLE \`workshops_page_sinus_workshops\`;`)
  await db.run(sql`DROP TABLE \`workshops_page_larynx_workshops\`;`)
  await db.run(sql`DROP TABLE \`workshops_page_larynx_stats\`;`)
  await db.run(sql`DROP TABLE \`workshops_page\`;`)
  await db.run(sql`DROP TABLE \`training_courses_page_management_team\`;`)
  await db.run(sql`DROP TABLE \`training_courses_page_courses_procedures\`;`)
  await db.run(sql`DROP TABLE \`training_courses_page_courses\`;`)
  await db.run(sql`DROP TABLE \`training_courses_page_why_artificial_bone_check_list\`;`)
  await db.run(sql`DROP TABLE \`training_courses_page_why_artificial_bone_stats\`;`)
  await db.run(sql`DROP TABLE \`training_courses_page\`;`)
  await db.run(sql`DROP TABLE \`lead_submissions\`;`)
  await db.run(sql`DROP TABLE \`learning_bites_page_video_list\`;`)
  await db.run(sql`DROP TABLE \`learning_bites_page\`;`)
  await db.run(sql`DROP TABLE \`carts_items\`;`)
  await db.run(sql`DROP TABLE \`carts\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_dropdown_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`footer_quick_links\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
}
