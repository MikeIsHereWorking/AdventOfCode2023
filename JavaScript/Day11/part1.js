import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

let universe = []

const findEmptyRows = (array, l) => Array.from({ length: l }, ((x, i) => i)).filter(n => array.find(x => x[1] === n) === undefined)
function mapGalaxies(universe) {
    let galaxyMap = [];
    universe.forEach((line, r) => {
        let galaxy = line.reduce((a, e, c) => {
            if (e === '#') {
                a.push([r, c]);
            }
            return a;
        }, []);

        if (galaxy.length > 0) {
            galaxyMap.push(...galaxy)
        }
    })

    return galaxyMap;

}

function expand(universe, emptyRowIndexes) {

    let expandedUniverse = [];
    universe.forEach((line, r) => {
        let newLine = [...line];
        // vertical

        emptyRowIndexes.forEach(c => newLine[c] = [newLine[c], '.']);
        newLine = newLine.flat();
        expandedUniverse.push(newLine.flat());
        // horizontial 
        if (newLine.every(c => c === '.')) {
            expandedUniverse.push(newLine.flat());
        }
    });

    return expandedUniverse;
}

//Main
input.forEach((line) => {
    universe.push(line.split(''));
})


let galaxyMap = mapGalaxies(universe);
let emptyRowIndexs = findEmptyRows(galaxyMap, universe[0].length);

universe = expand(universe, emptyRowIndexs)
galaxyMap = mapGalaxies(universe); // remap in the expanded universe


let result = 0;

for (let a = 0; a < galaxyMap.length; a++)
    for (let b = a + 1; b < galaxyMap.length; b++) {
        const [aR, aC] = galaxyMap[a];
        const [bR, bC] = galaxyMap[b];

        result += Math.abs(aR - bR) + Math.abs(aC - bC);

    }

console.log(result)


