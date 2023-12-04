import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

const partNumber = [];
const symbols = [];

function findParts(x, y, partNumber) {

    return partNumber.filter(part => {
        if (x >= part.x && x <= part.maxX && y === part.y && !part.isCounted) {
            part.isCounted = true;
            return part;
        }
    });

}
input.forEach((line, l) => {
    let number = '';
    let startNumber = -1;
    for (var i = 0; i < line.length; i++) {
        if (line[i].match(/\d/)) {
            number += line[i];
            if (startNumber === -1) startNumber = i;
            continue;
        }

        // if it was not a number then save off the number if it exists 
        if (number !== '') {
            partNumber.push({ "x": startNumber, "maxX": startNumber + number.length - 1, "y": l, "number": +number, "isCounted": false });
            number = '';
            startNumber = -1;
        }
        if (line[i] === '*') {
            symbols.push({ "x": i, "y": l });
        }
    }

    //end of line check
    if (number !== '') {
        partNumber.push({ "x": startNumber, "maxX": startNumber + number.length - 1, "y": l, "number": +number, "isCounted": false });
        number = '';
        startNumber = -1;
    }
});





var answer = 0;
symbols.forEach(coordinates => {
    let results = [];
    // top-left
    results.push(...findParts(coordinates.x - 1, coordinates.y - 1, partNumber));
    // top-middle
    results.push(...findParts(coordinates.x, coordinates.y - 1, partNumber));
    // top-right
    results.push(...findParts(coordinates.x + 1, coordinates.y - 1, partNumber));
    // middle-left
    results.push(...findParts(coordinates.x - 1, coordinates.y, partNumber));
    // middle-right
    results.push(...findParts(coordinates.x + 1, coordinates.y, partNumber));
    // bottom-left
    results.push(...findParts(coordinates.x - 1, coordinates.y + 1, partNumber));
    // bottom-left
    results.push(...findParts(coordinates.x, coordinates.y + 1, partNumber));
    // bottom-left
    results.push(...findParts(coordinates.x + 1, coordinates.y + 1, partNumber));

    if (results.length == 2) {
        answer += results[0].number * results[1].number;
    }

    console.log(results, answer);
});



console.log(answer);

