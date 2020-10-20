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
var getPatientsWithoutSsn = function () {
    return patients_1["default"].map(function (patient) {
        delete patient.ssn;
        return patient;
    });
};
var addNewPatient = function (patient) {
    var newPatient = __assign(__assign({}, patient), { id: uuid_1.v1() });
    patients_1["default"].push(newPatient);
    return newPatient;
};
exports["default"] = { getPatients: getPatients, getPatientsWithoutSsn: getPatientsWithoutSsn, addNewPatient: addNewPatient };
