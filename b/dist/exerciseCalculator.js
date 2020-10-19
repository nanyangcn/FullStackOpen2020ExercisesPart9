"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var calculateExercises_1 = __importDefault(require("./calculateExercises"));
var parseExerciseArguments = function (args) {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    args.shift();
    args.shift();
    var argsNumber = args.map(function (arg) { return Number(arg); });
    if (argsNumber.some(function (arg) { return isNaN(arg); })) {
        throw new Error('Provided values were not numbers!');
    }
    var target = argsNumber[0];
    argsNumber.shift();
    var daily_exercises = argsNumber;
    return {
        target: target,
        daily_exercises: daily_exercises
    };
};
var _a = parseExerciseArguments(process.argv), target = _a.target, daily_exercises = _a.daily_exercises;
var result = calculateExercises_1["default"](target, daily_exercises);
if (result.exercise) {
    console.log(result.exercise);
}
else if (result.error === 'Invalid exercise hours') {
    console.log(result.error);
}
else {
    throw new Error(result.error);
}
