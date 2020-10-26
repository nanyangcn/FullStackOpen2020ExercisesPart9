import calculateBmi from './calculateBmi';

interface Values {
  value1: number
  value2: number
}

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const { value1, value2 } = parseArguments(process.argv);
const result = calculateBmi(value1, value2);
if (result.category){
  console.log(result.category);
} else if (result.error === 'Invalid bmi value') {
  console.log('Error, something bad happened, message: ', result.error);
} else {
  throw new Error(result.error);
}

export default calculateBmi;
