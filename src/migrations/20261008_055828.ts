import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_header\` (
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
  await db.run(sql`INSERT INTO \`__new_header\`("id", "announcement_text", "announcement_link_text", "announcement_link_url", "logo_id", "logo_url", "search_placeholder", "buy_now_button_text", "buy_now_button_url", "cart_url", "login_button_text", "login_button_url", "updated_at", "created_at") SELECT "id", "announcement_text", "announcement_link_text", "announcement_link_url", "logo_id", "logo_url", "search_placeholder", "buy_now_button_text", "buy_now_button_url", "cart_url", "login_button_text", "login_button_url", "updated_at", "created_at" FROM \`header\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`contact_page_id\` integer REFERENCES contact_page(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`contact_submissions_id\` integer REFERENCES contact_submissions(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`customized_model_page_id\` integer REFERENCES customized_model_page(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`customized_model_submissions_id\` integer REFERENCES customized_model_submissions(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`workshops_page_id\` integer REFERENCES workshops_page(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`training_courses_page_id\` integer REFERENCES training_courses_page(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`checkout_submissions_id\` integer REFERENCES checkout_submissions(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`lead_submissions_id\` integer REFERENCES lead_submissions(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_page_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customized_model_page_id_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customized_model_submissio_idx\` ON \`payload_locked_documents_rels\` (\`customized_model_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_workshops_page_id_idx\` ON \`payload_locked_documents_rels\` (\`workshops_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_training_courses_page_id_idx\` ON \`payload_locked_documents_rels\` (\`training_courses_page_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_checkout_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`checkout_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lead_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_submissions_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`contact_submissions\`;`)
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
  await db.run(sql`DROP TABLE \`checkout_submissions_items\`;`)
  await db.run(sql`DROP TABLE \`checkout_submissions\`;`)
  await db.run(sql`DROP TABLE \`lead_submissions\`;`)
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
  	\`products_page_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipping_addresses_id\`) REFERENCES \`shipping_addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`home_page_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`resources_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_page_id\`) REFERENCES \`products_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "media_id", "home_page_id", "resources_id", "products_page_id") SELECT "id", "order", "parent_id", "path", "users_id", "shipping_addresses_id", "media_id", "home_page_id", "resources_id", "products_page_id" FROM \`payload_locked_documents_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_page_id_idx\` ON \`payload_locked_documents_rels\` (\`products_page_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`announcement_text\` text DEFAULT 'Unlock new opportunities by upskilling and stepping into a brighter future.' NOT NULL,
  	\`announcement_link_text\` text DEFAULT 'Explore Now!!' NOT NULL,
  	\`announcement_link_url\` text DEFAULT '#workshops' NOT NULL,
  	\`logo_id\` integer,
  	\`logo_url\` text DEFAULT '/images/logo.svg',
  	\`search_placeholder\` text DEFAULT 'What would you like to learn?',
  	\`buy_now_button_text\` text DEFAULT 'Buy Now',
  	\`buy_now_button_url\` text DEFAULT '/products',
  	\`cart_url\` text DEFAULT 'https://pro-guide.in/',
  	\`login_button_text\` text DEFAULT 'Login /Register',
  	\`login_button_url\` text DEFAULT 'https://pro-guide.in/',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header\`("id", "announcement_text", "announcement_link_text", "announcement_link_url", "logo_id", "logo_url", "search_placeholder", "buy_now_button_text", "buy_now_button_url", "cart_url", "login_button_text", "login_button_url", "updated_at", "created_at") SELECT "id", "announcement_text", "announcement_link_text", "announcement_link_url", "logo_id", "logo_url", "search_placeholder", "buy_now_button_text", "buy_now_button_url", "cart_url", "login_button_text", "login_button_url", "updated_at", "created_at" FROM \`header\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
}
