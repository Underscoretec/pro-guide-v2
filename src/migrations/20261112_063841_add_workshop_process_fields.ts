import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`workshop_details_dates_and_time_slots\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`date\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_dates_and_time_slots_order_idx\` ON \`workshop_details_dates_and_time_slots\` (\`_order\`);`)
  } catch {}
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_dates_and_time_slots_parent_id_idx\` ON \`workshop_details_dates_and_time_slots\` (\`_parent_id\`);`)
  } catch {}
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`workshop_details_dates_and_time_slots_slots\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`start_time\` text NOT NULL,
  	\`end_time\` text NOT NULL,
  	\`seats\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshop_details_dates_and_time_slots\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_dates_and_time_slots_slots_order_idx\` ON \`workshop_details_dates_and_time_slots_slots\` (\`_order\`);`)
  } catch {}
  try {
    await db.run(sql`CREATE INDEX \`workshop_details_dates_and_time_slots_slots_parent_id_idx\` ON \`workshop_details_dates_and_time_slots_slots\` (\`_parent_id\`);`)
  } catch {}
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`DROP TABLE IF EXISTS \`__new_workshop_details\`;`)
  await db.run(sql`CREATE TABLE \`__new_workshop_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'published',
  	\`booking\` integer DEFAULT true,
  	\`subtitle\` text DEFAULT 'KBI SkillBridge • Hands-On Faculty-Led Dissection Workshop',
  	\`category\` text DEFAULT 'Maternal Medicine & Obstetrics',
  	\`delivery_mode\` text DEFAULT 'offline' NOT NULL,
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`duration\` text DEFAULT '1 Day Hands-on',
  	\`description\` text,
  	\`price_i_n_r\` numeric DEFAULT 45000,
  	\`gst_percent\` numeric DEFAULT 18,
  	\`price_u_s_d\` numeric DEFAULT 499,
  	\`seats_per_session\` numeric DEFAULT 40,
  	\`online_live_details_platform\` text DEFAULT 'Zoom',
  	\`online_live_details_join_link\` text,
  	\`online_live_details_send_join_link\` text DEFAULT 'Right after registration and 1 hour before.',
  	\`offline_details_venue_name\` text DEFAULT 'Tata Memorial Hospital',
  	\`offline_details_full_address\` text DEFAULT 'Dr E Borges Road, Parel, Mumbai 400012',
  	\`offline_details_google_maps_link\` text,
  	\`offline_details_reporting_time\` text DEFAULT '30 minutes before the slot',
  	\`offline_details_seats_per_session_offline\` numeric DEFAULT 40,
  	\`offline_details_check_in_method\` text DEFAULT 'QR code scanned at the registration desk',
  	\`offline_details_what_participants_should_bring\` text DEFAULT 'Photo ID, scrubs and closed shoes',
  	\`offline_details_on_site_contact\` text DEFAULT '+91 98765 43210',
  	\`offline_details_certificate\` integer DEFAULT true,
  	\`learners\` text DEFAULT '1:1 Station Ratio',
  	\`academic_heading\` text DEFAULT 'Academic & Surgical Procedural Coverage',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_workshop_details\`("id", "title", "slug", "status", "booking", "subtitle", "category", "delivery_mode", "image_id", "image_url", "duration", "description", "price_i_n_r", "gst_percent", "price_u_s_d", "seats_per_session", "online_live_details_platform", "online_live_details_join_link", "online_live_details_send_join_link", "offline_details_venue_name", "offline_details_full_address", "offline_details_google_maps_link", "offline_details_reporting_time", "offline_details_seats_per_session_offline", "offline_details_check_in_method", "offline_details_what_participants_should_bring", "offline_details_on_site_contact", "offline_details_certificate", "learners", "academic_heading", "updated_at", "created_at") SELECT "id", "title", "slug", 'published', 1, "subtitle", "category", 'offline', "image_id", "image_url", "duration", NULL, 45000, 18, 499, 40, 'Zoom', NULL, 'Right after registration and 1 hour before.', 'Tata Memorial Hospital', 'Dr E Borges Road, Parel, Mumbai 400012', NULL, '30 minutes before the slot', 40, 'QR code scanned at the registration desk', 'Photo ID, scrubs and closed shoes', '+91 98765 43210', 1, "learners", "academic_heading", "updated_at", "created_at" FROM \`workshop_details\`;`)
  await db.run(sql`DROP TABLE \`workshop_details\`;`)
  await db.run(sql`ALTER TABLE \`__new_workshop_details\` RENAME TO \`workshop_details\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`workshop_details_slug_idx\` ON \`workshop_details\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_image_idx\` ON \`workshop_details\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_updated_at_idx\` ON \`workshop_details\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_created_at_idx\` ON \`workshop_details\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE IF EXISTS \`__new_workshop_registrations\`;`)
  await db.run(sql`CREATE TABLE \`__new_workshop_registrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`workshop_slug\` text NOT NULL,
  	\`workshop_title\` text NOT NULL,
  	\`user_id\` integer,
  	\`participant_name\` text,
  	\`participant_email\` text,
  	\`participant_phone\` text,
  	\`institution\` text,
  	\`medical_reg_number\` text,
  	\`country\` text DEFAULT 'India',
  	\`selected_date\` text,
  	\`selected_time\` text,
  	\`amount_paid\` numeric,
  	\`razorpay_payment_id\` text,
  	\`razorpay_order_id\` text,
  	\`ticket_id\` text,
  	\`status\` text DEFAULT 'confirmed',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_workshop_registrations\`("id", "workshop_slug", "workshop_title", "user_id", "participant_name", "participant_email", "participant_phone", "institution", "medical_reg_number", "country", "selected_date", "selected_time", "amount_paid", "razorpay_payment_id", "razorpay_order_id", "ticket_id", "status", "updated_at", "created_at") SELECT "id", "workshop_slug", "workshop_title", "user_id", NULL, NULL, NULL, NULL, NULL, 'India', NULL, NULL, NULL, NULL, NULL, NULL, 'confirmed', "updated_at", "created_at" FROM \`workshop_registrations\`;`)
  await db.run(sql`DROP TABLE \`workshop_registrations\`;`)
  await db.run(sql`ALTER TABLE \`__new_workshop_registrations\` RENAME TO \`workshop_registrations\`;`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_workshop_slug_idx\` ON \`workshop_registrations\` (\`workshop_slug\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_user_idx\` ON \`workshop_registrations\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_updated_at_idx\` ON \`workshop_registrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_created_at_idx\` ON \`workshop_registrations\` (\`created_at\`);`)
  try {
    await db.run(sql`ALTER TABLE \`users\` ADD \`password_reset_otp_hash\` text;`)
  } catch {}
  try {
    await db.run(sql`ALTER TABLE \`users\` ADD \`password_reset_otp_expires_at\` text;`)
  } catch {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`workshop_details_dates_and_time_slots_slots\`;`)
  await db.run(sql`DROP TABLE \`workshop_details_dates_and_time_slots\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`DROP TABLE IF EXISTS \`__new_workshop_details\`;`)
  await db.run(sql`CREATE TABLE \`__new_workshop_details\` (
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
  await db.run(sql`INSERT INTO \`__new_workshop_details\`("id", "title", "slug", "subtitle", "category", "image_id", "image_url", "duration", "learners", "academic_heading", "updated_at", "created_at") SELECT "id", "title", "slug", "subtitle", "category", "image_id", "image_url", "duration", "learners", "academic_heading", "updated_at", "created_at" FROM \`workshop_details\`;`)
  await db.run(sql`DROP TABLE \`workshop_details\`;`)
  await db.run(sql`ALTER TABLE \`__new_workshop_details\` RENAME TO \`workshop_details\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`workshop_details_slug_idx\` ON \`workshop_details\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_image_idx\` ON \`workshop_details\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_updated_at_idx\` ON \`workshop_details\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshop_details_created_at_idx\` ON \`workshop_details\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE IF EXISTS \`__new_workshop_registrations\`;`)
  await db.run(sql`CREATE TABLE \`__new_workshop_registrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`workshop_slug\` text NOT NULL,
  	\`workshop_title\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_workshop_registrations\`("id", "user_id", "workshop_slug", "workshop_title", "updated_at", "created_at") SELECT "id", "user_id", "workshop_slug", "workshop_title", "updated_at", "created_at" FROM \`workshop_registrations\`;`)
  await db.run(sql`DROP TABLE \`workshop_registrations\`;`)
  await db.run(sql`ALTER TABLE \`__new_workshop_registrations\` RENAME TO \`workshop_registrations\`;`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_user_idx\` ON \`workshop_registrations\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_workshop_slug_idx\` ON \`workshop_registrations\` (\`workshop_slug\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_updated_at_idx\` ON \`workshop_registrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workshop_registrations_created_at_idx\` ON \`workshop_registrations\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`password_reset_otp_hash\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`password_reset_otp_expires_at\`;`)
}
