"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var calculateBmi_1 = __importDefault(require("./calculateBmi"));
var calculateExercises_1 = __importDefault(require("./calculateExercises"));
var app = express_1["default"]();
app.use(express_1["default"].json());
app.get('/bmi', function (req, res) {
    var height = Number(req.query.height);
    var weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.send({ error: 'malformatted parameters' });
    }
    else {
        var bmiResult = calculateBmi_1["default"](height, weight);
        if (bmiResult.category) {
            res.send({
                weight: weight,
                height: height,
                bmi: bmiResult.category
            });
        }
        else if (bmiResult.error === 'Invalid bmi value') {
            res.send({ error: bmiResult.error });
        }
    }
});
app.post('/exercise', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var body = req.body;
    if (!body.target || !body.daily_exercises) {
        res.send({ error: "parameters missing" });
    }
    else {
        var target = Number(body.target);
        var daily_exercises = body.daily_exercises.map(function (hour) { return Number(hour); });
        if (isNaN(target) || daily_exercises.some(function (hour) { return isNaN(hour); })) {
            res.send({ error: 'malformatted parameters' });
        }
        else {
            var result = calculateExercises_1["default"](target, daily_exercises);
            if (result.exercise) {
                res.send(result.exercise);
            }
            else if (result.error) {
                res.send(result.error);
            }
        }
    }
});
var PORT = 3002;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
