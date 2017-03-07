import * as express from 'express';
const httpMod = require("http");
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as PrettyError from 'pretty-error';

import libraryRouter from './controllers/LibraryController';
import sensorRouter from './controllers/SensorController';
import searchRouter from './controllers/SearchController';

const app: express.Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use('/api/v1', libraryRouter);
app.use('/api/v1', sensorRouter);
app.use('/api/v1', searchRouter);

app.use((err: any, req: any, res: any, next: any) => {
  process.stderr.write(pe.render(err));
  next();
});

export default app;
