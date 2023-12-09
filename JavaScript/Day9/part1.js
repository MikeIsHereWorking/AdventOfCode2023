import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

function computeDiffs(values) {
    let result = [];

    for (let i = 1; i < values.length; i++) {
        result.push(values[i] - values[i - 1]);
    }
    return result;
}

function computeNextLevel(values) {
    //console.log(values)
    if (values.every(x => x === 0)) return 0;

    let diffs = computeDiffs(values);
    let lineEnd = computeNextLevel(diffs);

    return lineEnd + values[values.length - 1];

}


console.log(input.map(line => computeNextLevel(line.split(' ').map(x => Number(x)))).reduce((t, c) => t + c));