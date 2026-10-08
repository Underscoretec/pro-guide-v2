import * as migration_20261008_064440 from './20261008_064440';
import * as migration_20261008_064612 from './20261008_064612';

export const migrations = [
  {
    up: migration_20261008_064440.up,
    down: migration_20261008_064440.down,
    name: '20261008_064440',
  },
  {
    up: migration_20261008_064612.up,
    down: migration_20261008_064612.down,
    name: '20261008_064612'
  },
];
