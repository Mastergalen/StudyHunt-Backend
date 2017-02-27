import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as PrettyError from 'pretty-error';

import libraryRouter from './controllers/LibraryController';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use('/api/v1', libraryRouter);

app.use((err: any, req: any, res:any, next: any) => {
  process.stderr.write(pe.render(err));
  next();
});

app.get('/api')

export default app;