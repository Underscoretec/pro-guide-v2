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
];
