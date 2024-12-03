import { readFile } from "fs";

const continueMul = "do";
const stopMul = "don't";

const parseCorruptedText = (text: string): number => {
    const regex = /mul\(\d+,\d+\)|\bdo\b|\bdon't\b/gm;
    const matches = text.match(regex);

    let result = 0;
    let isMultiplying = true;
    if (matches) {
        for (const match of matches) {
            if (match === continueMul) {
                isMultiplying = true;
            }

            if (match === stopMul) {
                isMultiplying = false;
                continue;
            }

            const numbers = match.match(/\d+/g);
            if (numbers && isMultiplying) {
                result += parseInt(numbers[0]) * parseInt(numbers[1]);
            }
        }
    }

    return result;
};

readFile('day3/input.txt', { encoding: "utf-8" }, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(parseCorruptedText(data));
});