import { list1, list2 } from "./input";

/**
 * Calculates the similarity score between two lists of numbers.
 * The similarity score is determined by summing up the product of each
 * number in the first list and its frequency in the second list.
 *
 * @param {number[]} firstList - The first list of numbers.
 * @param {number[]} secondList - The second list of numbers.
 * @returns {number} The similarity score. If the lists have different lengths, returns -1.
 *
 */
const getSimilarityScore = (
  firstList: number[],
  secondList: number[]
): number => {
  if (firstList.length !== secondList.length) {
    return -1;
  }

  const frequencyMap: Record<number, number> = {};
  for (const num of secondList) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  }

  let similarityScore = 0;
  for (const num of firstList) {
    const appearances = frequencyMap[num] || 0;
    similarityScore += appearances * num;
  }

  return similarityScore;
};

console.log(getSimilarityScore(list1, list2)); // 2970687
