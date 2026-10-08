import * as migration_20261006_123617 from './20261006_123617';
import * as migration_20261006_125858 from './20261006_125858';
import * as migration_20261008_055828 from './20261008_055828';
import * as migration_20261008_061517 from './20261008_061517';
import * as migration_20261008_071419 from './20261008_071419';
import * as migration_20261008_074200 from './20261008_074200';

export const migrations = [
  {
    up: migration_20261006_123617.up,
    down: migration_20261006_123617.down,
    name: '20261006_123617',
  },
  {
    up: migration_20261006_125858.up,
    down: migration_20261006_125858.down,
    name: '20261006_125858',
  },
  {
    up: migration_20261008_055828.up,
    down: migration_20261008_055828.down,
    name: '20261008_055828',
  },
  {
    up: migration_20261008_061517.up,
    down: migration_20261008_061517.down,
    name: '20261008_061517',
  },
  {
    up: migration_20261008_071419.up,
    down: migration_20261008_071419.down,
    name: '20261008_071419',
  },
  {
    up: migration_20261008_074200.up,
    down: migration_20261008_074200.down,
    name: '20261008_074200',
  },
];
