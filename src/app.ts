import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as PrettyError from 'pretty-error';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err: any, req: any, res:any, next: any) => {
  process.stderr.write(pe.render(err));
  next();
});

export default app;