import * as migration_20261008_123915 from './20261008_123915';
import * as migration_20261009_055554_add_razorpay_fields from './20261009_055554_add_razorpay_fields';
import * as migration_20261009_062113 from './20261009_062113';
import * as migration_20261009_100949_add_resources_and_3d_simulation from './20261009_100949_add_resources_and_3d_simulation';
import * as migration_20261009_110900_add_family_id_to_products from './20261009_110900_add_family_id_to_products';
import * as migration_20261012_053228 from './20261012_053228';
import * as migration_20261012_055128_add_family_title_and_subtitle from './20261012_055128_add_family_title_and_subtitle';
import * as migration_20261012_073305 from './20261012_073305';
import * as migration_20261013_113510_add_blogs from './20261013_113510_add_blogs';
import * as migration_20261014_061001 from './20261014_061001';
import * as migration_20261014_061717 from './20261014_061717';
import * as migration_20261014_063601 from './20261014_063601';
import * as migration_20261014_072437 from './20261014_072437';
import * as migration_20261014_074000_add_part_number_to_blogs from './20261014_074000_add_part_number_to_blogs';
import * as migration_20261014_090000_remove_management_initials from './20261014_090000_remove_management_initials';
import * as migration_20261015_045240_add_workshop_details from './20261015_045240_add_workshop_details';
import * as migration_20261015_045730 from './20261015_045730';
import * as migration_20261015_054509 from './20261015_054509';
import * as migration_20261026_083601_add_workshop_registrations from './20261026_083601_add_workshop_registrations';
import * as migration_20261026_120000_add_password_reset_otp_to_users from './20261026_120000_add_password_reset_otp_to_users';
import * as migration_20261112_063841_add_workshop_process_fields from './20261112_063841_add_workshop_process_fields';
import * as migration_20261112_070000_add_online_recorded_details from './20261112_070000_add_online_recorded_details';
import * as migration_20261112_073000_add_admin_sidebar_and_run_details from './20261112_073000_add_admin_sidebar_and_run_details';
import * as migration_20261112_083000_add_faculty_faq_and_specs from './20261112_083000_add_faculty_faq_and_specs';

export const migrations = [
  {
    up: migration_20261008_123915.up,
    down: migration_20261008_123915.down,
    name: '20261008_123915',
  },
  {
    up: migration_20261009_055554_add_razorpay_fields.up,
    down: migration_20261009_055554_add_razorpay_fields.down,
    name: '20261009_055554_add_razorpay_fields',
  },
  {
    up: migration_20261009_062113.up,
    down: migration_20261009_062113.down,
    name: '20261009_062113',
  },
  {
    up: migration_20261009_100949_add_resources_and_3d_simulation.up,
    down: migration_20261009_100949_add_resources_and_3d_simulation.down,
    name: '20261009_100949_add_resources_and_3d_simulation',
  },
  {
    up: migration_20261009_110900_add_family_id_to_products.up,
    down: migration_20261009_110900_add_family_id_to_products.down,
    name: '20261009_110900_add_family_id_to_products',
  },
  {
    up: migration_20261012_053228.up,
    down: migration_20261012_053228.down,
    name: '20261012_053228',
  },
  {
    up: migration_20261012_055128_add_family_title_and_subtitle.up,
    down: migration_20261012_055128_add_family_title_and_subtitle.down,
    name: '20261012_055128_add_family_title_and_subtitle',
  },
  {
    up: migration_20261012_073305.up,
    down: migration_20261012_073305.down,
    name: '20261012_073305',
  },
  {
    up: migration_20261013_113510_add_blogs.up,
    down: migration_20261013_113510_add_blogs.down,
    name: '20261013_113510_add_blogs',
  },
  {
    up: migration_20261014_061001.up,
    down: migration_20261014_061001.down,
    name: '20261014_061001',
  },
  {
    up: migration_20261014_061717.up,
    down: migration_20261014_061717.down,
    name: '20261014_061717',
  },
  {
    up: migration_20261014_063601.up,
    down: migration_20261014_063601.down,
    name: '20261014_063601',
  },
  {
    up: migration_20261014_072437.up,
    down: migration_20261014_072437.down,
    name: '20261014_072437',
  },
  {
    up: migration_20261014_074000_add_part_number_to_blogs.up,
    down: migration_20261014_074000_add_part_number_to_blogs.down,
    name: '20261014_074000_add_part_number_to_blogs',
  },
  {
    up: migration_20261014_090000_remove_management_initials.up,
    down: migration_20261014_090000_remove_management_initials.down,
    name: '20261014_090000_remove_management_initials',
  },
  {
    up: migration_20261015_045240_add_workshop_details.up,
    down: migration_20261015_045240_add_workshop_details.down,
    name: '20261015_045240_add_workshop_details',
  },
  {
    up: migration_20261015_045730.up,
    down: migration_20261015_045730.down,
    name: '20261015_045730',
  },
  {
    up: migration_20261015_054509.up,
    down: migration_20261015_054509.down,
    name: '20261015_054509',
  },
  {
    up: migration_20261026_083601_add_workshop_registrations.up,
    down: migration_20261026_083601_add_workshop_registrations.down,
    name: '20261026_083601_add_workshop_registrations',
  },
  {
    up: migration_20261026_120000_add_password_reset_otp_to_users.up,
    down: migration_20261026_120000_add_password_reset_otp_to_users.down,
    name: '20261026_120000_add_password_reset_otp_to_users',
  },
  {
    up: migration_20261112_063841_add_workshop_process_fields.up,
    down: migration_20261112_063841_add_workshop_process_fields.down,
    name: '20261112_063841_add_workshop_process_fields',
  },
  {
    up: migration_20261112_070000_add_online_recorded_details.up,
    down: migration_20261112_070000_add_online_recorded_details.down,
    name: '20261112_070000_add_online_recorded_details',
  },
  {
    up: migration_20261112_073000_add_admin_sidebar_and_run_details.up,
    down: migration_20261112_073000_add_admin_sidebar_and_run_details.down,
    name: '20261112_073000_add_admin_sidebar_and_run_details',
  },
  {
    up: migration_20261112_083000_add_faculty_faq_and_specs.up,
    down: migration_20261112_083000_add_faculty_faq_and_specs.down,
    name: '20261112_083000_add_faculty_faq_and_specs',
  },
];
