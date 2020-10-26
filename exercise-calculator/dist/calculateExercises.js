"use strict";
exports.__esModule = true;
var calculateExercises = function (target, daily_exercises) {
    var periodLength = daily_exercises.length;
    var hoursNoZero = daily_exercises.filter(function (hour) { return hour !== 0; });
    var trainingDays = hoursNoZero.length;
    var hoursSum = hoursNoZero.reduce(function (sum, hour) { return sum + hour; });
    var average = hoursSum / periodLength;
    var rating = 0;
    var ratingDescription = '';
    if (average >= 0 && average < 1) {
        rating = 1;
        ratingDescription = 'bad';
    }
    else if (average >= 1 && average < 2) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else if (average >= 2) {
        rating = 3;
        ratingDescription = 'good';
    }
    else {
        return { error: 'Invalid exercise hours' };
    }
    var success = false;
    if (average >= target) {
        success = true;
    }
    return {
        exercise: {
            periodLength: periodLength,
            trainingDays: trainingDays,
            success: success,
            rating: rating,
            ratingDescription: ratingDescription,
            target: target,
            average: average
        }
    };
};
exports["default"] = calculateExercises;
