"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var calculateBmi_1 = __importDefault(require("./calculateBmi"));
var parseArguments = function (args) {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
var _a = parseArguments(process.argv), value1 = _a.value1, value2 = _a.value2;
var result = calculateBmi_1["default"](value1, value2);
if (result.category) {
    console.log(result.category);
}
else if (result.error === 'Invalid bmi value') {
    console.log('Error, something bad happened, message: ', result.error);
}
else {
    throw new Error(result.error);
}
exports["default"] = calculateBmi_1["default"];
