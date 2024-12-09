import { processFile } from "../utils";

const checksum = (input: string, isPart2: boolean): number => {
    const numbers = input.split("").map(Number);

    if (isPart2) {
        let disk: { id: number | ".", length: number }[] = [];
        let id = 0;

        for (let i = 0; i < numbers.length; i++) {
            if (i % 2 === 0) {
                disk.push({ id: id++, length: numbers[i] });
            } else {
                disk.push({ id: ".", length: numbers[i] });
            }
        }

        // Reorganize disk
        for (let i = id - 1; i >= 0; i--) {
            const fileIndex = disk.findIndex(block => block.id === i);
            const freeIndex = disk.findIndex(
                block => block.id === "." && block.length >= disk[fileIndex].length
            );

            if (!disk[freeIndex] || fileIndex < freeIndex) continue;

            if (disk[freeIndex].length > disk[fileIndex].length) {
                disk = [
                    ...disk.slice(0, freeIndex),
                    { id: disk[fileIndex].id, length: disk[fileIndex].length },
                    { id: ".", length: disk[freeIndex].length - disk[fileIndex].length },
                    ...disk.slice(freeIndex + 1)
                ];
                disk[fileIndex + 1].id = ".";
            } else if (disk[freeIndex].length === disk[fileIndex].length) {
                disk[freeIndex].id = disk[fileIndex].id;
                disk[fileIndex].id = ".";
            }
        }

        // Merge consecutive free blocks
        for (let j = 0; j < disk.length - 1; j++) {
            if (disk[j].id === "." && disk[j + 1].id === ".") {
                disk = [
                    ...disk.slice(0, j),
                    { id: ".", length: disk[j].length + disk[j + 1].length },
                    ...disk.slice(j + 2)
                ];
                j--; // Recheck from the same index
            }
        }

        // Calculate checksum
        let block = 0, checksum = 0;
        for (let i = 0; i < disk.length; i++) {
            if (disk[i].id === ".") {
                block += disk[i].length;
            } else {
                for (let j = 0; j < disk[i].length; j++) {
                    checksum += block * (disk[i].id as number);
                    block++;
                }
            }
        }

        return checksum;
    }

    // Part 1 logic (unchanged)
    let id = 0;
    const stringArray: (string | number)[] = [];

    for (let i = 0; i < numbers.length; i++) {
        const current = numbers[i];
        if (i % 2 === 1) {
            for (let j = 0; j < current; j++) {
                stringArray.push(".");
            }
            continue;
        }

        for (let j = 0; j < current; j++) {
            stringArray.push(id);
        }

        id++;
    }

    stringArray.forEach((element, index) => {
        if (element === ".") {
            const lastNumberIndex = stringArray.findLastIndex((el) => el !== ".");
            if (lastNumberIndex !== -1) {
                stringArray[index] = stringArray[lastNumberIndex];
                stringArray.splice(lastNumberIndex, 1);
            }
        }
    });

    let num = 0;
    stringArray.forEach((element, index) => {
        if (typeof element !== "number") return;

        const amount = index * element;
        num += amount;
    });

    return num;
};

const input = await processFile("day9/input.txt");
console.log("Part 1: ", checksum(input, false));
console.log("Part 2: ", checksum(input, true));
