import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

let steps = input[0].split('');
let travelMap = {};
for (let i = 2; i < input.length; i++) {
    let line = input[i].match(/[A-Z][A-Z][A-Z]/g);
    travelMap[line[0]] = [line[1], line[2]];

}

let stepCounter = 0;
let stepDirection = 'AAA'
while (stepDirection !== 'ZZZ') {
    let index = steps[(stepCounter++) % steps.length] === 'R' ? 1 : 0;
    stepDirection = travelMap[stepDirection][index]
}

console.log(stepCounter);
