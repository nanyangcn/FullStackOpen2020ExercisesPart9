import calculateExercises, { exerciseInput } from './calculateExercises';

const parseExerciseArguments = (args: Array<string>): exerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  args.shift();
  args.shift();
  const argsNumber: Array<number> = args.map((arg) => Number(arg));
  if (argsNumber.some((arg) => isNaN(arg))) {
    throw new Error('Provided values were not numbers!');
  }

  const target: number = argsNumber[0];
  argsNumber.shift();
  const daily_exercises: Array<number> = argsNumber;

  return {
    target,
    daily_exercises,
  };
};

const { target, daily_exercises } = parseExerciseArguments(process.argv);
const result = calculateExercises(target, daily_exercises);

if (result.exercise) {
  console.log(result.exercise);
} else if (result.error === 'Invalid exercise hours') {
  console.log(result.error);
} else {
  throw new Error(result.error);
}
