import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'migrations',
  },
  debug: process.env.NODE_ENV !== 'production',
  pool: { min: 0, max: 7 }
});

export default db;