import * as migration_20261008_123915 from './20261008_123915';
import * as migration_20261009_055554_add_razorpay_fields from './20261009_055554_add_razorpay_fields';
import * as migration_20261009_062113 from './20261009_062113';
import * as migration_20261009_100949_add_resources_and_3d_simulation from './20261009_100949_add_resources_and_3d_simulation';
import * as migration_20261009_110900_add_family_id_to_products from './20261009_110900_add_family_id_to_products';
import * as migration_20261012_053228 from './20261012_053228';
import * as migration_20261012_055128_add_family_title_and_subtitle from './20261012_055128_add_family_title_and_subtitle';
import * as migration_20261012_073305 from './20261012_073305';
import * as migration_20261013_113510_add_blogs from './20261013_113510_add_blogs';

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
    name: '20261013_113510_add_blogs'
  },
];
