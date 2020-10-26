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
declare const calculateExercises: (target: number, daily_exercises: any) => exerciseCalculatorResult;
export default calculateExercises;
