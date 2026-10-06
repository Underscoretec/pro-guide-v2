import * as migration_20261006_123617 from './20261006_123617';
import * as migration_20261006_125858 from './20261006_125858';

export const migrations = [
  {
    up: migration_20261006_123617.up,
    down: migration_20261006_123617.down,
    name: '20261006_123617',
  },
  {
    up: migration_20261006_125858.up,
    down: migration_20261006_125858.down,
    name: '20261006_125858'
  },
];
