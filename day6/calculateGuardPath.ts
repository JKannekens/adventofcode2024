import { processFile } from "../utils";

const calculateGuardInfiniteLoops = (rawInput: string): string[] => {
  const lines = rawInput.trim().split("\n");
  const grid = lines.map((line) => line.split(""));

  const infiniteLoopPositions: string[] = [];
  const directions = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];

  // Helper to simulate guard movement
  const doesLoop = (
    testGrid: string[][],
    startRow: number,
    startCol: number
  ): boolean => {
    const visited = new Set<string>();
    let guardRow = startRow;
    let guardCol = startCol;
    let currentDirection = 0;

    while (true) {
      const state = `${guardRow},${guardCol},${currentDirection}`;
      if (visited.has(state)) return true; // Cycle detected
      visited.add(state);

      const [dRow, dCol] = directions[currentDirection];
      const nextRow = guardRow + dRow;
      const nextCol = guardCol + dCol;

      if (
        nextRow < 0 ||
        nextRow >= testGrid.length ||
        nextCol < 0 ||
        nextCol >= testGrid[0].length
      ) {
        break; // Guard leaves the grid
      }

      if (testGrid[nextRow][nextCol] === "#") {
        currentDirection = (currentDirection + 1) % 4; // Turn right
        continue;
      }

      guardRow = nextRow;
      guardCol = nextCol;
    }

    return false; // No cycle detected
  };

  // Find the guard's initial position
  let guardRow = -1;
  let guardCol = -1;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "^") {
        guardRow = row;
        guardCol = col;
        break;
      }
    }
    if (guardRow !== -1) break;
  }

  if (guardRow === -1 || guardCol === -1) {
    throw new Error("Guard not found in the grid!");
  }

  // Test placing an obstacle at each empty position
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === ".") {
        // Place an obstacle and test
        const testGrid = grid.map((r) => [...r]); // Copy grid
        testGrid[row][col] = "#";

        if (doesLoop(testGrid, guardRow, guardCol)) {
          infiniteLoopPositions.push(`${row},${col}`);
        }
      }
    }
  }

  return infiniteLoopPositions;
};

const input = await processFile("day6/input.txt");
console.log(calculateGuardInfiniteLoops(input));
