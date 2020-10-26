import express from 'express';

import calculateBmi from './calculateBmi';
import calculateExercises, { exerciseInput } from './calculateExercises';

const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: 'malformatted parameters' });
  } else {
    const bmiResult = calculateBmi(height, weight);
    if (bmiResult.category) {
      res.send({
        weight,
        height,
        bmi: bmiResult.category,
      });
    } else if (bmiResult.error === 'Invalid bmi value') {
      res.send({ error: bmiResult.error });
    }
  }
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: exerciseInput = req.body;

  if (!body.target || !body.daily_exercises) {
    res.send({ error: "parameters missing" });
  } else {
    const target = Number(body.target);
    const daily_exercises = body.daily_exercises.map(hour => Number(hour));
    if (isNaN(target) || daily_exercises.some(hour => isNaN(hour))) {
      res.send({ error: 'malformatted parameters' });
    } else {
      const result = calculateExercises(target, daily_exercises);
      if (result.exercise) {
        res.send(result.exercise);
      } else if (result.error) {
        res.send(result.error);
      }
    }
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
