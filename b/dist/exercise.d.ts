interface exerciseObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
interface exerciseCalculatorResult {
    exercise?: exerciseObject;
    error?: 'Invalid exercise hours';
}
declare const exerciseCalculator: (target: number, hours: any) => exerciseCalculatorResult;
export default exerciseCalculator;
