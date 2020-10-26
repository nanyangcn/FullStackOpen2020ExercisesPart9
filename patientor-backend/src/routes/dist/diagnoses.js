"use strict";
exports.__esModule = true;
var express_1 = require("express");
var diagnoseService_1 = require("../services/diagnoseService");
var router = express_1["default"].Router();
router.get('/', function (_req, res) {
    res.send(diagnoseService_1["default"].getDiagnoses());
});
router.post('/', function (_req, res) {
    res.send('Saving a diary!');
});
exports["default"] = router;
