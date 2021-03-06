"use strict";
exports.__esModule = true;
var calculateBmi = function (height, mass) {
    var bmi = mass / Math.pow((height / 100), 2);
    var category = '';
    if (bmi > 0 && bmi <= 15) {
        category = 'Very severely underweight';
    }
    else if (bmi > 15 && bmi <= 16) {
        category = 'Severely underweight';
    }
    else if (bmi > 16 && bmi <= 18.5) {
        category = 'Underweight';
    }
    else if (bmi > 18.5 && bmi <= 25) {
        category = 'Normal (healthy weight)';
    }
    else if (bmi > 25 && bmi <= 30) {
        category = 'Overweight';
    }
    else if (bmi > 30 && bmi <= 35) {
        category = 'Obese Class I (Moderately obese)';
    }
    else if (bmi > 35 && bmi <= 40) {
        category = 'Obese Class II (Severely obese)';
    }
    else if (bmi > 40) {
        category = 'Obese Class III (Very severely obese)';
    }
    else {
        return { error: 'Invalid bmi value' };
    }
    return { category: category };
};
exports["default"] = calculateBmi;
