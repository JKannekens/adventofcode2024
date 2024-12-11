const addStone = (stones: Map<number, number>, key: number, count = 1) =>
    stones.set(key, (stones.get(key) || 0) + count);

const countStones = (input: number[], blinks: number): number => {
    let stones = new Map<number, number>();

    for (const key of input) {
        addStone(stones, key);
    }

    const iterate = (stones: Map<number, number>) => {
        const newStones = new Map<number, number>();

        for (const [key, count] of stones) {
            const keyStr = key.toString();

            if (key === 0) {
                addStone(newStones, 1, count);
            } else if (keyStr.length % 2 === 0) {
                const half = keyStr.length / 2;
                addStone(newStones, Number(keyStr.slice(0, half)), count);
                addStone(newStones, Number(keyStr.slice(half)), count);
            } else {
                addStone(newStones, key * 2024, count);
            }
        }

        return newStones;
    };

    for (let i = 0; i < blinks; i++) {
        stones = iterate(stones);
    }

    return Array.from(stones.values()).reduce((acc, count) => acc + count, 0);
};

// Usage example
const data = await Bun.file(new URL("input.txt", import.meta.url)).text();
const input = data.split(" ").map(Number);

// Part 1
console.log(countStones(input, 25));

// Part 2
console.log(countStones(input, 75));