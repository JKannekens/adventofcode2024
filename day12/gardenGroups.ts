const input = await Bun.file(new URL("input.txt", import.meta.url)).text();
const garden = input.split("\n").map(row => row.split(""));

type Point = { x: number; y: number };

const calculateRegions = (grid: string[][]): { area: number; perimeter: number }[] => {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 }
    ];

    const inBounds = (x: number, y: number) => x >= 0 && y >= 0 && x < rows && y < cols;

    const sides = new Map<string, string[]>();
    const floodFill = (start: Point, plantType: string): { area: number; perimeter: number } => {
        const queue: Point[] = [start];
        visited[start.x][start.y] = true;

        let area = 0;
        let perimeter = 0;

        while (queue.length > 0) {
            const { x, y } = queue.shift()!;
            area++;

            for (const { x: dx, y: dy } of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (!inBounds(nx, ny) || grid[nx][ny] !== plantType) {
                    console.log(nx, ny, plantType);
                    const side = sides.get(`${plantType}`) || [];
                    sides.set(`${plantType}`, [...side, `${nx},${ny}`]);

                    perimeter++;
                } else if (!visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push({ x: nx, y: ny });
                }
            }
        }

        sides.forEach((value, key) => {
            value.forEach((side) => {
                const [x, y] = side.split(",").map(Number);
                // Count unique sides

            });
        });

        return { area, perimeter };
    };

    const regions: { area: number; perimeter: number }[] = [];

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (!visited[x][y]) {
                const plantType = grid[x][y];
                regions.push(floodFill({ x, y }, plantType));
            }
        }
    }

    // console.log(sides);

    return regions;
}

const result = calculateRegions(garden);
console.log(result);
console.log(result.reduce((acc, region) => acc + region.area * region.perimeter, 0));
