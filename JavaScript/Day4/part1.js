import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'day4.data');

const input = TextInputReader(fileName);

let answer = 0;
input.forEach((line, i) => {


    line = line.split(':')[1];
    let split = line.split('|');
    let myNumbers = split[0].trim().replaceAll('  ', ' ').split(' ').map(x => +x);
    let winningNumbers = split[1].trim().replaceAll('  ', ' ').split(' ').map(x => +x);
    let count = myNumbers.filter(n => winningNumbers.includes(n)).length

    answer += count > 0 ? 2 ** (count - 1) : 0;

});

console.log(answer);
