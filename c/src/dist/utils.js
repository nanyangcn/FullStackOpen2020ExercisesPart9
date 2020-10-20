"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-explicit-any */
var types_1 = require("./types");
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var isDate = function (date) {
    return Boolean(Date.parse(date));
};
var isGender = function (gender) {
    return Object.values(types_1.Gender).includes(gender);
};
var parseName = function (name) {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + String(name));
    }
    return name;
};
var parseDateOfBirth = function (date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing dateOfBirth: " + String(date));
    }
    return date;
};
var parseSsn = function (ssn) {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn: " + String(ssn));
    }
    return ssn;
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + String(gender));
    }
    return gender;
};
var parseOccupation = function (occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + String(occupation));
    }
    return occupation;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var toNewPatient = function (object) {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        name: parseName(object.name),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ssn: parseSsn(object.ssn),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        gender: parseGender(object.gender),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        occupation: parseOccupation(object.occupation)
    };
};
exports["default"] = toNewPatient;
