"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var patients_1 = require("../../data/patients");
var uuid_1 = require("uuid");
var getPatients = function () {
    return patients_1["default"];
};
var getPublicPatient = function () {
    return patients_1["default"].map(function (patient) { return ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    }); });
};
var findPatientById = function (id) {
    return patients_1["default"].find(function (patient) { return patient.id === id; });
};
var addNewPatient = function (patient) {
    var newPatient = __assign(__assign({}, patient), { id: uuid_1.v1() });
    patients_1["default"].push(newPatient);
    return newPatient;
};
var addNewEntry = function (entry, id) {
    var newEntry = __assign(__assign({}, entry), { id: uuid_1.v1() });
    var patient = patients_1["default"].find(function (patient) { return patient.id === id; });
    if (!patient) {
        throw new Error("patient not found by id: " + id);
    }
    patient.entries.push(newEntry);
    return newEntry;
};
exports["default"] = {
    getPatients: getPatients,
    getPublicPatient: getPublicPatient,
    findPatientById: findPatientById,
    addNewPatient: addNewPatient,
    addNewEntry: addNewEntry
};
