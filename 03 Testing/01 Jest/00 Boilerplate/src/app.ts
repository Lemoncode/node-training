import * as express from 'express';
import * as bodyParser from 'body-parser';
import { env } from './env';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(env.PORT);

// tslint:disable-next-line:no-console
console.log(`Running on port ${env.PORT}`);
