import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = path.join(__dirname, 'day1TestData.data');

const input = TextInputReader(fileName);

const limit = {
    "blue": 14,
    "red": 12,
    "green": 13,
}
let answer = 0
input.forEach(line => {
    const gameExp = /Game (\d+):/g;
    const pullExp = /(\d+) (blue|red|green)/g;
    let gameNumber = gameExp.exec(line)[1];
    let pulls = line.match(pullExp, "");
    let valid = true;
    for (let element of pulls) {
        let parts = element.split(' ');
        if (+parts[0] > limit[parts[1]]) {
            valid = false;
            break;
        }
    }
    answer += (valid) ? +gameNumber : 0;
});

console.log(answer);