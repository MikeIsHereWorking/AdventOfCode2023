import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'day4.data');

const input = TextInputReader(fileName);

let answer = 0;
let numberOfCards = Array.from({ length: input.length }, x => 1);
console.log(numberOfCards);
input.forEach((line, i) => {


    line = line.split(':')[1];
    let split = line.split('|');
    let myNumbers = split[0].trim().replaceAll('  ', ' ').split(' ').map(x => +x);
    let winningNumbers = split[1].trim().replaceAll('  ', ' ').split(' ').map(x => +x);
    let hits = myNumbers.filter(n => winningNumbers.includes(n)).length
    console.log('i:', i, 'count:', hits);
    for (let h = i + 1; h < Math.min(hits + i + 1, numberOfCards.length); h++) {
        numberOfCards[h] += numberOfCards[i];
    }
});

console.log(numberOfCards);
console.log(numberOfCards.reduce((t, c) => t + c));
