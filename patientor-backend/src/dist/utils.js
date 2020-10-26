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
exports.toNewEntry = exports.toNewPatient = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
var isEntry = function (entries) {
    return Array.isArray(entries);
};
var isEntryType = function (type) {
    return Object.values(types_1.EntryType).includes(type);
};
var isDiagnosisCodes = function (diagnosisCodes) {
    return diagnosisCodes.every(function (diagnosis) { return typeof diagnosis === 'string'; });
};
var isHealthCheckRating = function (healthCheckRating) {
    return Object.values(types_1.HealthCheckRating).includes(healthCheckRating);
};
var isDischarge = function (discharge) {
    if (!discharge.date ||
        !isDate(discharge.date) ||
        !discharge.criteria ||
        !isString(discharge.criteria)) {
        return false;
    }
    return true;
};
var isSickLeave = function (sickLeave) {
    if (!sickLeave.startDate ||
        !isDate(sickLeave.startDate) ||
        !sickLeave.endDate ||
        !isDate(sickLeave.endDate)) {
        return false;
    }
    return true;
};
var parseName = function (name) {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + JSON.stringify(name));
    }
    return name;
};
var parseDateOfBirth = function (date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing dateOfBirth: " + JSON.stringify(date));
    }
    return date;
};
var parseSsn = function (ssn) {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn: " + JSON.stringify(ssn));
    }
    return ssn;
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + JSON.stringify(gender));
    }
    return gender;
};
var parseOccupation = function (occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + JSON.stringify(occupation));
    }
    return occupation;
};
var parseEntries = function (entries) {
    if (!entries) {
        return [];
    }
    if (!isEntry(entries)) {
        throw new Error("Incorrect or missing entries: " + JSON.stringify(entries));
    }
    return entries;
};
var parseType = function (type) {
    if (!type || !isEntryType(type)) {
        throw new Error("Incorrect or missing entry:type : " + JSON.stringify(type));
    }
    return type;
};
var parseDescription = function (description) {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description: " + JSON.stringify(description));
    }
    return description;
};
var parseDate = function (date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + JSON.stringify(date));
    }
    return date;
};
var parseSpecialist = function (specialist) {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist: " + JSON.stringify(specialist));
    }
    return specialist;
};
var parseDiagnosisCodes = function (diagnosisCodes) {
    if (!diagnosisCodes) {
        return [];
    }
    if (!Array.isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error("Incorrect diagnosisCodes: " + JSON.stringify(diagnosisCodes));
    }
    return diagnosisCodes;
};
var parseHealthCheckRating = function (healthCheckRating) {
    if (healthCheckRating === undefined ||
        !isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing healthCheckRating: " + JSON.stringify(healthCheckRating));
    }
    return healthCheckRating;
};
var parseDischarge = function (discharge) {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error("Incorrect or missing discharge: " + JSON.stringify(discharge));
    }
    return discharge;
};
var parseEmployerName = function (employerName) {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employerName: " + JSON.stringify(employerName));
    }
    return employerName;
};
var parseSickLeave = function (sickLeave) {
    if (!sickLeave) {
        return undefined;
    }
    if (!isSickLeave(sickLeave)) {
        throw new Error("Incorrect sickLeave: " + JSON.stringify(sickLeave));
    }
    return sickLeave;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.toNewPatient = function (object) {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.toNewEntry = function (object) {
    var type = parseType(object.type);
    var entry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
    switch (type) {
        case 'HealthCheck':
            return __assign(__assign({}, entry), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        case 'Hospital':
            return __assign(__assign({}, entry), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
        case 'OccupationalHealthcare':
            return __assign(__assign({}, entry), { type: 'OccupationalHealthcare', employerName: parseEmployerName(object.employerName), sickLeave: parseSickLeave(object.sickLeave) });
        default:
            throw new Error("Incorrect or missing entry:type : " + JSON.stringify(type));
    }
};
