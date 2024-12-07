import { readLines } from "../utils";

export const isSafeArray = (arr: number[]): boolean => {
  let isIncreasing: boolean | null = null;

  for (let i = 1; i < arr.length; i++) {
    const step = arr[i] - arr[i - 1];
    const absStep = Math.abs(step);

    if (absStep < 1 || absStep > 3) {
      return false;
    }

    if (isIncreasing === null) {
      isIncreasing = step > 0;
    } else if (isIncreasing !== step > 0) {
      return false;
    }
  }

  return true;
};

const input = await readLines("day2/input.txt");
const checkReports = () => {
  let safeReports = 0;
  for (const report of input) {
    if (isSafeArray(report)) {
      safeReports++;
    } else {
      for (let i = 0; i < report.length; i++) {
        const tempArray = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafeArray(tempArray)) {
          safeReports++;
          break;
        }
      }
    }
  }
  return safeReports;
};

console.log(checkReports());
