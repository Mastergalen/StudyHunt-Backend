// let db;
import * as dotenv from 'dotenv'
import * as http from 'http';
import * as Debug from 'debug';
import app from './src/app';
let server: http.Server;

dotenv.config();

const debug = Debug('app:main');

// Launch Node.js server
const launch = () => {
  // db = require('./db').default;
  server = app.listen(process.env.PORT, () => {
    console.log(`Node.js API server is listening on http://localhost:${String(process.env.PORT)}/`);
  });
};

// Shutdown Node.js server and database clients

async function shutDown() {
  if (server) {
    await server.close();
  }

  // TODO Destroy DB () => db && db.destroy(),
}

const handleError = (err: any) => console.error(err.stack);

// Graceful shutdown
process.once('SIGTERM', () => shutDown().then(() => process.exit()));

launch();
