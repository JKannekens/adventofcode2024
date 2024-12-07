import { processFile } from "../utils";

const getCalibrationResult = (rawInput: string, isP2?: boolean) => {
  const input = rawInput.split("\n").map((l) => l.split(/[^\d]+/).map(Number));
  console.log(input);
  return input.reduce((total, [target, ...values]) => {
    const operators = [
      (a: number, b: number) => a * b,
      (a: number, b: number) => a + b,
      ...(isP2 ? [(a: number, b: number) => Number(`${a}${b}`)] : []),
    ];
    const evaluate = (numbers: number[]) => {
      if (numbers[0] > target) return false;
      if (numbers.length === 1) return numbers[0] === target;
      for (const op of operators) {
        if (evaluate([op(numbers[0], numbers[1]), ...numbers.slice(2)])) {
          return true;
        }
      }
    };
    return total + (evaluate(values) ? target : 0);
  }, 0);
};

const input = await processFile("day7/input.txt");
// Part 1
console.log(getCalibrationResult(input));
// Part 2
console.log(getCalibrationResult(input, true));
