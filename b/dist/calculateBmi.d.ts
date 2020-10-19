interface BmiResult {
    category?: string;
    error?: 'Invalid bmi value';
}
declare const calculateBmi: (height: number, mass: number) => BmiResult;
export default calculateBmi;
