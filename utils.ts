import * as fs from 'fs';

export const readLines = (filePath: string): number[][] => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data
            .split('\n')
            .map(line => line.trim()) // Remove extra spaces
            .filter(line => line !== '') // Ignore empty lines
            .map(line => {
                const numbers = line.split(' ').map(Number);
                if (numbers.some(isNaN)) {
                    throw new Error(`Invalid data found in line: "${line}"`);
                }
                return numbers;
            });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error reading or parsing file: ${error.message}`);
        }
        return [];
    }
};
