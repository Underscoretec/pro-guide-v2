import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_page_blocks_testimonials_stories_list\` ADD \`designation\` text;`)
  await db.run(sql`ALTER TABLE \`home_page_blocks_testimonials_stories_list\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`home_page_blocks_testimonials_stories_list\` ADD \`image_url\` text;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_stories_list_image_idx\` ON \`home_page_blocks_testimonials_stories_list\` (\`image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_home_page_blocks_testimonials_stories_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page_blocks_testimonials_stories_list\`("_order", "_parent_id", "id", "quote", "author") SELECT "_order", "_parent_id", "id", "quote", "author" FROM \`home_page_blocks_testimonials_stories_list\`;`)
  await db.run(sql`DROP TABLE \`home_page_blocks_testimonials_stories_list\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page_blocks_testimonials_stories_list\` RENAME TO \`home_page_blocks_testimonials_stories_list\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_stories_list_order_idx\` ON \`home_page_blocks_testimonials_stories_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_blocks_testimonials_stories_list_parent_id_idx\` ON \`home_page_blocks_testimonials_stories_list\` (\`_parent_id\`);`)
}
