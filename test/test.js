"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var nyxs_ts_1 = require("./../src/services/nyxs.ts");
var image = fs_1.default.readFile("./../malas_ngoding.jpg");
(0, nyxs_ts_1.default)(Buffer.from(image))
    .then(function (d) { return console.log(d); })
    .catch(function (e) { return console.log(e); });
