"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var diagnoses_1 = require("./routes/diagnoses");
var patients_1 = require("./routes/patients");
var app = express_1["default"]();
app.use(express_1["default"].json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1["default"]());
var PORT = 3001;
app.get('/api/ping', function (_req, res) {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnosis', diagnoses_1["default"]);
app.use('/api/patients', patients_1["default"]);
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
