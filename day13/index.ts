const input = await Bun.file("day13/input.txt").text();

const PART2_OFFSET = 10_000_000_000_000;
const BUTTON_A_COST = 3;
const BUTTON_B_COST = 1;

type Point = { x: number; y: number };
type Button = Point & { cost: number };
type Entry = { buttonA: Button; buttonB: Button; prize: Point };

const parseInput = (input: string, part2: boolean): Entry[] => {
  const parsePoint = (regex: RegExp, block: string): Point => {
    const match = block.match(regex);
    if (!match) throw new Error("Invalid input format");

    return { x: parseInt(match[1]), y: parseInt(match[2]) };
  };

  return input
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const offset = part2 ? PART2_OFFSET : 0;

      const prize = parsePoint(/Prize: X=(\d+), Y=(\d+)/, block);
      const buttonA = parsePoint(/Button A: X[+=](\d+), Y[+=](\d+)/, block);
      const buttonB = parsePoint(/Button B: X[+=](\d+), Y[+=](\d+)/, block);

      return {
        buttonA: { ...buttonA, cost: BUTTON_A_COST },
        buttonB: { ...buttonB, cost: BUTTON_B_COST },
        prize: { x: prize.x + offset, y: prize.y + offset },
      };
    });
};

const computeTokens = ({ buttonA, buttonB, prize }: Entry): number => {
  const denominator = buttonA.x * buttonB.y - buttonA.y * buttonB.x;
  if (denominator === 0) return 0;

  const b = (buttonA.x * prize.y - buttonA.y * prize.x) / denominator;
  const a = (prize.x - buttonB.x * b) / buttonA.x;

  return Number.isInteger(a) && Number.isInteger(b) ? a * buttonA.cost + b : 0;
};

// Part 1
const entries = parseInput(input, false);
const tokens = entries.reduce(
  (total, entry) => total + computeTokens(entry),
  0
);
console.log(tokens);

// Part 2
const part2Entries = parseInput(input, true);
const part2Tokens = part2Entries.reduce(
  (total, entry) => total + computeTokens(entry),
  0
);
console.log(part2Tokens);
