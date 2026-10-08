import * as migration_20261008_064440 from './20261008_064440';
import * as migration_20261008_064612 from './20261008_064612';
import * as migration_20261008_093100_add_orders_and_products from './20261008_093100_add_orders_and_products';
import * as migration_20261008_100315 from './20261008_100315';

export const migrations = [
  {
    up: migration_20261008_064440.up,
    down: migration_20261008_064440.down,
    name: '20261008_064440',
  },
  {
    up: migration_20261008_064612.up,
    down: migration_20261008_064612.down,
    name: '20261008_064612',
  },
  {
    up: migration_20261008_093100_add_orders_and_products.up,
    down: migration_20261008_093100_add_orders_and_products.down,
    name: '20261008_093100_add_orders_and_products',
  },
  {
    up: migration_20261008_100315.up,
    down: migration_20261008_100315.down,
    name: '20261008_100315'
  },
];
