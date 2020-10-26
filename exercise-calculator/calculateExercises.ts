export interface exerciseInput {
  target: number
  daily_exercises: Array<number>
}

interface exerciseObject {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface exerciseCalculatorResult {
  exercise?: exerciseObject
  error?: 'Invalid exercise hours'
}

const calculateExercises = (
  target: number,
  daily_exercises: Array<number>
): exerciseCalculatorResult => {
  const periodLength: number = daily_exercises.length;

  const hoursNoZero: Array<number> = daily_exercises.filter((hour) => hour !== 0);
  const trainingDays: number = hoursNoZero.length;

  const hoursSum: number = hoursNoZero.reduce((sum, hour) => sum + hour);
  const average: number = hoursSum / periodLength;

  let rating = 0;
  let ratingDescription = '';

  if (average >= 0 && average < 1) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average >= 1 && average < 2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (average >= 2) {
    rating = 3;
    ratingDescription = 'good';
  } else {
    return { error: 'Invalid exercise hours' };
  }

  let success = false;

  if (average >= target) {
    success = true;
  }

  return {
    exercise: {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    }
  };
};

export default calculateExercises;