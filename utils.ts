import { readFile } from "fs/promises";

export const processFile = async (filePath: string): Promise<string> => {
  try {
    return await readFile(filePath, "utf-8");
  } catch (err) {
    console.error(`Failed to process file: ${(err as Error).message}`);
    return "";
  }
};

export const readLines = async (filePath: string): Promise<number[][]> => {
  try {
    const data = await readFile(filePath, "utf-8");
    return data
      .split("\n")
      .map((line) => line.trim()) // Remove extra spaces
      .filter((line) => line !== "") // Ignore empty lines
      .map((line) => {
        const numbers = line.split(" ").map(Number);
        if (numbers.some(isNaN)) {
          throw new Error(`Invalid data found in line: "${line}"`);
        }
        return numbers;
      });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error reading or parsing file: ${error.message}`);
    }
    return [];
  }
};
