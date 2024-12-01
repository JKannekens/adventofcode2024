import { list1, list2 } from "./input";

/**
 * Calculates the distance between two lists of numbers.
 * The distance is determined by summing up the absolute difference between
 * each number in the first list and its corresponding number in the second list.
 *
 * @param {number[]} firstList - The first list of numbers.
 * @param {number[]} secondList - The second list of numbers.
 * @returns {number} The distance between the two lists. If the lists have different lengths, returns -1.
 *
 */
const getDistanceBetweenLists = (
  firstList: number[],
  secondList: number[]
): number => {
  if (firstList.length !== secondList.length) {
    return -1;
  }

  const sortedList1 = [...firstList].sort((a, b) => a - b);
  const sortedList2 = [...secondList].sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < sortedList1.length; i++) {
    totalDistance += Math.abs(sortedList1[i] - sortedList2[i]);
  }

  return totalDistance;
};

console.log(getDistanceBetweenLists(list1, list2)); // 2970687
