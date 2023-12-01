import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = path.join(__dirname, 'day1TestData.data');

const p = TextInputReader(path.join(__dirname, 'day1TestData.data'));
let answer = 0;

function convertTextToNumber(line) {
    line = line.replace(/one/g, "one1one");
    line = line.replace(/two/g, "two2two");
    line = line.replace(/three/g, "three3three");
    line = line.replace(/four/g, "four4four");
    line = line.replace(/five/g, "five5five");
    line = line.replace(/six/g, "six6six");
    line = line.replace(/seven/g, "seven7seven");
    line = line.replace(/eight/g, "eight8eight");
    line = line.replace(/nine/g, "nine9nine");


    return line;
}


p.forEach(line => {
    line = convertTextToNumber(line);
    let d = line.replace(/\D/g, "");
    console.log(line, d, +(d[0] + d[d.length - 1]));
    answer += +(d[0] + d[d.length - 1]);
})



//console.log(convertTextToNumber("oneone"));
console.log(answer);
