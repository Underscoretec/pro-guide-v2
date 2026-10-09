import * as migration_20261008_123915 from './20261008_123915';
import * as migration_20261009_062113 from './20261009_062113';
import * as migration_20261009_055554_add_razorpay_fields from './20261009_055554_add_razorpay_fields';

export const migrations = [
  {
    up: migration_20261008_123915.up,
    down: migration_20261008_123915.down,
    name: '20261008_123915',
  },
  {
    up: migration_20261009_062113.up,
    down: migration_20261009_062113.down,
    name: '20261009_062113',
  },
  {
    up: migration_20261009_055554_add_razorpay_fields.up,
    down: migration_20261009_055554_add_razorpay_fields.down,
    name: '20261009_055554_add_razorpay_fields'
  },
];
