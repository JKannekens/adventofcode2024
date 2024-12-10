type Point = { x: number; y: number };

const input = await Bun.file(new URL("input.txt", import.meta.url)).text();

const hikingTrail = (input: string, isPart2: boolean): number => {
    const grid = input.split("\n").map((row) => row.split("").map(Number));
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 }
    ];

    const visited = new Set<string>();
    const visitedPaths = new Set<string>();

    const checkTrails = (current: Point, expectedValue: number, firstPoint: string): void => {
        const { x, y } = current;

        if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] !== expectedValue) return;

        visited.add(`${x},${y}`);

        if (grid[x][y] === 9) {
            if (!isPart2) {
                visitedPaths.add(`${firstPoint},${x},${y}`);
                return;
            }

            visitedPaths.add([...visited].join(","));
        }


        for (const direction of directions) {
            checkTrails(
                { x: x + direction.x, y: y + direction.y },
                expectedValue + 1,
                firstPoint
            );
        }

        visited.delete(`${x},${y}`);
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 0) {
                checkTrails({ x: i, y: j }, 0, `${i},${j}`);
            }
        }
    }

    return visitedPaths.size;
};

// Part 1
console.log(hikingTrail(input, false));
// Part 2
console.log(hikingTrail(input, true));