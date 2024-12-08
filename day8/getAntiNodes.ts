import { processFile } from "../utils";

const isInBounds = (grid: string[][], row: number, col: number) =>
  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

const getAntiNodes = (rawInput: string, isPart2: boolean): number => {
  const lines = rawInput.trim().split("\n");
  const grid = lines.map((line) => line.split(""));

  const foundNodes = new Map<string, string[]>();

  grid.forEach((row, rowIndex) => {
    row.forEach((node, colIndex) => {
      if (node !== ".") {
        const values = foundNodes.get(node) || [];
        foundNodes.set(node, [...values, `${rowIndex},${colIndex}`]);
      }
    });
  });

  const antennaPositions = new Set<string>();

  const generateAntennas = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    key: string
  ) => {
    let antennaX = x1;
    let antennaY = y1;

    const addAntennaPositions = (direction: number) => {
      while (true) {
        antennaX += x2 * direction;
        antennaY += y2 * direction;

        if (!isInBounds(grid, antennaX, antennaY)) break;
        if (grid[antennaX][antennaY] === key) break;

        antennaPositions.add(`${antennaX},${antennaY}`);
        if (!isPart2) break;
      }
    };

    addAntennaPositions(1);
    addAntennaPositions(-1);
  };

  foundNodes.forEach((nodes, key) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const otherNodes = nodes.filter((n) => n !== node);
      const [nodeX, nodeY] = node.split(",").map(Number);

      for (let j = 0; j < otherNodes.length; j++) {
        const otherNode = otherNodes[j];
        const [otherNodeX, otherNodeY] = otherNode.split(",").map(Number);

        const distanceX = nodeX - otherNodeX;
        const distanceY = nodeY - otherNodeY;

        generateAntennas(nodeX, nodeY, distanceX, distanceY, key);
      }

      if (!isPart2) continue;
      antennaPositions.add(`${nodeX},${nodeY}`);
    }
  });

  return antennaPositions.size;
};

const input = await processFile("day8/input.txt");
// Part 1
console.log(getAntiNodes(input, false));
// Part 2
console.log(getAntiNodes(input, true));
