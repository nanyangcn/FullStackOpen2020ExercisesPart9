"use strict";
exports.__esModule = true;
var express_1 = require("express");
var patientService_1 = require("../services/patientService");
var utils_1 = require("../utils");
var router = express_1["default"].Router();
router.get('/', function (_req, res) {
    res.send(patientService_1["default"].getPatientsWithoutSsn());
});
router.post('/', function (req, res) {
    try {
        var newPatient = utils_1["default"](req.body);
        var addedPatient = patientService_1["default"].addNewPatient(newPatient);
        res.json(addedPatient);
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});
exports["default"] = router;
