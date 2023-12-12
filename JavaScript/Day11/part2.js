import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

let universe = []
let expansionFactor = 999999; // REPLACE the row with 1000000 rows means add 999999

const findEmptyRows = (array, l) => Array.from({ length: l }, ((x, i) => i)).filter(n => array.find(x => x[1] === n) === undefined)

function mapGalaxies(universe) {
    let galaxyMap = [];
    universe.forEach((line, r) => {
        let galaxy = line.reduce((a, e, c) => {
            if (e.space === '#') {
                a.push(e.coord);
            }
            return a;
        }, []);

        if (galaxy.length > 0) {
            galaxyMap.push(...galaxy)
        }
    })

    return galaxyMap;

}




function expand(universe, galaxyMap, emptyRowIndexes) {
    // vertical
    emptyRowIndexes.forEach((c, i) =>
        galaxyMap.forEach(coord => {

            if (coord[1] > (c + i * expansionFactor)) {
                coord[1] += expansionFactor;

            }
        }));

    let blankRows = 0; //cheeze 
    universe.forEach((line, r) => {
        // horizontial 
        if (line.every(c => c.space === '.')) {
            galaxyMap.forEach(coord => {
                if (coord[0] > (r + blankRows * expansionFactor))
                    coord[0] += expansionFactor;
            });

            blankRows++
        }

    });

    return galaxyMap;
}

//Main
input.forEach((line, r) => {
    universe.push(line.split('').map((x, c) => {
        return { 'space': x, 'coord': [r, c] }
    }));
})

let galaxyMap = mapGalaxies(universe);
let emptyRowIndexs = findEmptyRows(galaxyMap, universe[0].length);
// just adjust the map
galaxyMap = expand(universe, galaxyMap, emptyRowIndexs)
//galaxyMap = mapGalaxies(universe); // remap in the expanded universe

//console.log(universe)
console.log(galaxyMap)


let result = 0;

for (let a = 0; a < galaxyMap.length; a++)
    for (let b = a + 1; b < galaxyMap.length; b++) {
        const [aR, aC] = galaxyMap[a];
        const [bR, bC] = galaxyMap[b];

        result += Math.abs(aR - bR) + Math.abs(aC - bC);

    }

console.log(result)


