"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const env_1 = require("./env");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(env_1.env.PORT);
// tslint:disable-next-line:no-console
console.log(`Running on port ${env_1.env.PORT}`);

//# sourceMappingURL=app.js.map
