import * as express from 'express';
const httpMod = require("http");
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as PrettyError from 'pretty-error';

import libraryRouter from './controllers/LibraryController';
import sensorRouter from './controllers/SensorController';
import searchRouter from './controllers/SearchController';

const app: express.Express = express();

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  credentials: true,
  origin: function(origin: string, callback: Function){
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};

app.use(cors(corsOptions));
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
