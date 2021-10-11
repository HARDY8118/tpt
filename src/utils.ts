import { readFileSync } from 'fs';

export function readFile(filePath: string) {
    return JSON.parse(readFileSync(filePath, { encoding: 'utf8' }))
}
