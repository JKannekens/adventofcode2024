import { readFile } from "fs";

const isInBounds = (row: number, col: number, rows: number, cols: number): boolean =>
    row >= 0 && row < rows && col >= 0 && col < cols;

// Count occurrences of a word in all directions
const parseXmasString = (grid: string[][], word: string): number => {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    let count = 0;

    const directions = [
        { dr: 0, dc: 1 },   // Horizontal (right)
        { dr: 1, dc: 0 },   // Vertical (down)
        { dr: 1, dc: 1 },   // Diagonal (down-right)
        { dr: 1, dc: -1 },  // Diagonal (down-left)
        { dr: -1, dc: 0 },  // Vertical (up)
        { dr: -1, dc: 1 },  // Diagonal (up-right)
        { dr: -1, dc: -1 }, // Diagonal (up-left)
        { dr: 0, dc: -1 }   // Horizontal (left)
    ];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] !== word[0]) continue;
            for (const { dr, dc } of directions) {
                let match = true;
                for (let c = 0; c < word.length; c++) {
                    const newRow = row + dr * c;
                    const newCol = col + dc * c;
                    if (!isInBounds(newRow, newCol, rows, cols) || grid[newRow][newCol] !== word[c]) {
                        match = false;
                        break;
                    }
                }
                if (match) count++;
            }
        }
    }

    return count;
};

// Count occurrences of "XMAS" in specific diagonal patterns
const parseXmas = (grid: string[][]): number => {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    let count = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] !== "A") continue;

            const diagonals = [
                { dr: -1, dc: -1 }, { dr: -1, dc: 1 },
                { dr: 1, dc: -1 }, { dr: 1, dc: 1 }
            ];

            if (!diagonals.every(({ dr, dc }) => isInBounds(row + dr, col + dc, rows, cols))) continue;

            const topLeft = grid[row - 1][col - 1];
            const topRight = grid[row - 1][col + 1];
            const bottomLeft = grid[row + 1][col - 1];
            const bottomRight = grid[row + 1][col + 1];

            const isFirstDiagonalValid =
                (topLeft === "M" && bottomRight === "S") || (topLeft === "S" && bottomRight === "M");
            const isSecondDiagonalValid =
                (topRight === "M" && bottomLeft === "S") || (topRight === "S" && bottomLeft === "M");

            if (isFirstDiagonalValid && isSecondDiagonalValid) count++;
        }
    }

    return count;
};

const processFile = (filePath: string): void => {
    readFile(filePath, { encoding: "utf-8" }, (err, data) => {
        if (err) {
            console.error(`Failed to read file: ${err.message}`);
            return;
        }

        const grid = data
            .trim()
            .split("\n")
            .map(line => line.trim().split(""));

        console.log("Occurrences of 'XMAS':", parseXmasString(grid, "XMAS"));
        console.log("Special XMAS patterns:", parseXmas(grid));
    });
};

processFile("day4/input.txt");
