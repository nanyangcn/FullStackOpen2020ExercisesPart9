"use strict";
exports.__esModule = true;
var express_1 = require("express");
var patientService_1 = require("../services/patientService");
var utils_1 = require("../utils");
var router = express_1["default"].Router();
router.get('/', function (_req, res) {
    res.send(patientService_1["default"].getPublicPatient());
});
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var patient = patientService_1["default"].findPatientById(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', function (req, res) {
    try {
        var newPatient = utils_1.toNewPatient(req.body);
        var addedPatient = patientService_1["default"].addNewPatient(newPatient);
        res.json(addedPatient);
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});
router.post('/:id/entries', function (req, res) {
    var id = req.params.id;
    try {
        var newEntry = utils_1.toNewEntry(req.body);
        var addedEntry = patientService_1["default"].addNewEntry(newEntry, id);
        res.json(addedEntry);
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});
exports["default"] = router;
