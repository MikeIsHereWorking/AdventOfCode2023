import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

let times = [...input[0].matchAll(/\d+/g)].map(x => x[0]);

let distances = [...input[1].matchAll(/\d+/g)].map(x => x[0]);



let answer = 1;
times.forEach((t, i) => {
    let wins = Array.from({ length: t }, (x, i) => i + 1).filter(s => {
        if (s * (t - s) > distances[i]) return true;
    });

    console.log(wins);
    answer *= wins.length;
});

console.log(answer)