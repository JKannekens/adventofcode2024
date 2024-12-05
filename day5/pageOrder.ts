import { readFile } from "fs/promises";

const validPage = (page: number[], ruleMap: Map<number, number[]>): boolean => {
    return page.every((num, i) => {
        const rules = ruleMap.get(num);
        if (!rules) return true;
        return rules.every((rule) => {
            const ruleIndex = page.indexOf(rule);
            return ruleIndex === -1 || ruleIndex > i;
        });
    });
};

const sortPage = (page: number[], ruleMap: Map<number, number[]>): number[] => {
    const sortedPage = [...page];

    sortedPage.sort((a, b) => {
        const aRules = ruleMap.get(a) || [];
        const bRules = ruleMap.get(b) || [];

        if (bRules.includes(a)) return 1;
        if (aRules.includes(b)) return -1;

        return 0;
    });

    return sortedPage;
};

const countCorrectPages = (rules: number[][], pages: number[][]): number => {
    const ruleMap = new Map<number, number[]>();
    rules.forEach(([first, second]) => {
        if (!ruleMap.has(first)) {
            ruleMap.set(first, []);
        }
        ruleMap.get(first)?.push(second);
    });

    let count = 0;

    for (const page of pages) {
        if (validPage(page, ruleMap)) {
            const middlePageNumber = page[Math.floor(page.length / 2)];
            count += middlePageNumber;
        }
    }

    return count;
};

const processInvalidPages = (rules: number[][], pages: number[][]): number => {
    const ruleMap = new Map<number, number[]>();
    rules.forEach(([first, second]) => {
        if (!ruleMap.has(first)) {
            ruleMap.set(first, []);
        }
        ruleMap.get(first)?.push(second);
    });

    const invalidPages = [];

    for (const page of pages) {
        if (!validPage(page, ruleMap)) {
            invalidPages.push(page);
        }
    }

    const sortedPages = invalidPages.map((page) => sortPage(page, ruleMap));
    const middleNumbers = sortedPages.map((page) => page[Math.floor(page.length / 2)]);

    return middleNumbers.reduce((acc, num) => acc + num, 0);
};

const processFile = async (filePath: string): Promise<void> => {
    try {
        const data = await readFile(filePath, "utf-8");

        const [ruleBlock, pageBlock] = data.trim().split("\n\n");
        const rules = ruleBlock.split("\n").map((line) => line.split("|").map(Number));
        const pages = pageBlock.split("\n").map((line) => line.split(",").map(Number));

        // Part 1: Count correct pages
        const correctPagesSum = countCorrectPages(rules, pages);
        console.log(`Correct Page Count: ${correctPagesSum}`);

        // Part 2: Sort invalid pages
        const invalidPagesSum = processInvalidPages(rules, pages);
        console.log(`Sorted Invalid Pages: ${invalidPagesSum}`);
    } catch (err) {
        console.error(`Failed to process file: ${(err as Error).message}`);
    }
};

processFile("day5/input.txt");
