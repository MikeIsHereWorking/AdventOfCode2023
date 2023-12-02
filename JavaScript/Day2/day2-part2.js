import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = path.join(__dirname, 'day1TestData.data');

const input = TextInputReader(path.join(__dirname, 'day2TestData.data'));

let powers = [];
let answer = 0
input.forEach(game => {

    const gameLimit = {
        "blue": 0,
        "red": 0,
        "green": 0,
    }
    const pullExp = /(\d+) (blue|red|green)/g;
    let pulls = game.match(pullExp, "");
    for (let element of pulls) {
        let parts = element.split(' ');
        gameLimit[parts[1]] = Math.max(gameLimit[parts[1]], parts[0]);
    }

    powers.push(gameLimit["blue"] * gameLimit["red"] * gameLimit["green"]);
});

console.log(powers.reduce((total, current) => total + current));