const input = await Bun.file("day14/input.txt").text();

type Point = { x: number; y: number };
type Robot = { position: Point; velocity: Point };

const robots = input.split("\n").map<Robot>((line) => {
  const [_, px, py, vx, vy] =
    line.match(/p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/) || [];
  return {
    position: { x: parseInt(px), y: parseInt(py) },
    velocity: { x: parseInt(vx), y: parseInt(vy) },
  };
});

const gridWidth = 101;
const gridHeight = 103;
const middle = { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) };

for (let s = 0; s < 10000; s++) {
  for (const robot of robots) {
    robot.position.x =
      (robot.position.x + robot.velocity.x + gridWidth) % gridWidth;
    robot.position.y =
      (robot.position.y + robot.velocity.y + gridHeight) % gridHeight;
  }
  // Check for three
  // Check for > 10 in a row
  const rows = robots.map((r) => r.position.y);
  const rowCounts = new Map<number, number>();
  for (const row of rows) {
    rowCounts.set(row, (rowCounts.get(row) || 0) + 1);
  }

  rowCounts.entries().forEach(([row, count]) => {
    if (count > 10) {
      // check if the rows x is continuous
      const rowRobots = robots.filter((r) => r.position.y === row);
      const rowXs = rowRobots.map((r) => r.position.x);

      const hasStreakOfTen = (numbers: number[]): boolean => {
        // Sort the numbers to handle cases where the input is unordered
        numbers.sort((a, b) => a - b);

        let streak = 1; // Start with a streak of 1

        for (let i = 1; i < numbers.length; i++) {
          if (numbers[i] === numbers[i - 1] + 1) {
            // Consecutive number found
            streak++;
            if (streak >= 10) {
              return true; // Streak of at least 10 found
            }
          } else if (numbers[i] !== numbers[i - 1]) {
            // Reset streak if numbers are not consecutive (ignoring duplicates)
            streak = 1;
          }
        }

        return false; // No streak of at least 10 found
      };

      const rowOf10 = hasStreakOfTen(rowXs);
      if (rowOf10) {
        console.log("Row with 10:", row, s);
      }
    }
  });
}

const quadrants = [0, 0, 0, 0];

for (const { position } of robots) {
  if (position.x === middle.x || position.y === middle.y) continue;
  const isTop = position.y < middle.y;
  const isLeft = position.x < middle.x;

  if (isTop && isLeft) quadrants[0]++;
  else if (isTop) quadrants[1]++;
  else if (isLeft) quadrants[2]++;
  else quadrants[3]++;
}

const safetyFactor = quadrants.reduce((acc, count) => acc * count, 1);
console.log("Safety Factor:", safetyFactor);

// render the grid
const grid = Array.from({ length: gridHeight }, () =>
  Array.from({ length: gridWidth }, () => ".")
);

for (const { position } of robots) {
  grid[position.y][position.x] = "#";
}

console.log(grid.map((row) => row.join("")).join("\n"));
