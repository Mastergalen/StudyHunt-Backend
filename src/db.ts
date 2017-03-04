import * as knex from 'knex';

import * as knexfile from '../knexfile.js';

let config;

if (process.env.NODE_ENV === 'production') {
  config = knexfile.production;
} else {
  config = knexfile.development;
}

const db = knex(config);

export default db;
