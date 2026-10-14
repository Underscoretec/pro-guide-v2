import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_page_blocks_faculty_faculty_list\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_faculty_list_image_idx\` ON \`home_page_blocks_faculty_faculty_list\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`home_page_blocks_faculty_faculty_list\` DROP COLUMN \`initials\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_faculty_faculty_list\` (
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
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_faculty_faculty_list\`("_order", "_parent_id", "id", "initials", "name", "role", "bio") SELECT "_order", "_parent_id", "id", "initials", "name", "role", "bio" FROM \`home_page_blocks_faculty_faculty_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_faculty_faculty_list\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_faculty_faculty_list\` RENAME TO \`home_page_blocks_faculty_faculty_list\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_faculty_list_order_idx\` ON \`home_page_blocks_faculty_faculty_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_faculty_faculty_list_parent_id_idx\` ON \`home_page_blocks_faculty_faculty_list\` (\`_parent_id\`);`)
}
