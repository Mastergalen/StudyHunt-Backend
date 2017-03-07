import * as dotenv from 'dotenv'
const httpMod = require("http");
dotenv.config();
import * as Debug from 'debug';
import * as http from 'http';
import app from './src/app';
import io from './src/socket';
let server: http.Server;

const debug = Debug('app:main');

const httpServer = httpMod.Server(app);

// Start Web Socket server
io(httpServer);

// Launch Node.js server
const launch = () => {
  // db = require('./db').default;
  server = httpServer.listen(process.env.PORT, () => {
    debug(`Node.js API server is listening on http://localhost:${String(process.env.PORT)}/`);
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
