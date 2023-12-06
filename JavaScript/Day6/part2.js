import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

let times = [...input[0].matchAll(/\d+/g)].reduce((t, c) => t + c);

let distances = [...input[1].matchAll(/\d+/g)].reduce((t, c) => t + c);
console.log(times, distances);

let answer = Array.from({ length: times }, (x, i) => i + 1).filter(s => {
    if (s * (times - s) > distances) return true;
});



console.log(answer.length)