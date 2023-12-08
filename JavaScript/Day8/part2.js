import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
import lcm from 'compute-lcm';
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
let paths = Object.keys(travelMap).filter(a => a.endsWith('A'));
let pathSteps = paths.map(x => 0);
while (true) {
    //console.log(paths)
    let index = steps[(stepCounter) % steps.length] === 'R' ? 1 : 0;

    paths.forEach((p, i) => {
        paths[i] = travelMap[p][index];
        if (pathSteps[i] === 0 && paths[i].endsWith('Z'))
            pathSteps[i] = stepCounter + 1;
    });


    if (pathSteps.every(x => x > 0)) {
        console.log(lcm(...pathSteps))

        // Cheeze 
        break;
    }

    stepCounter++;
}
