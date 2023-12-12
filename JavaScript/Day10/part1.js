import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

const map = [];

const findS = (map) => {
    for (let r = 0; r < map.length; r++)
        for (let c = 0; c < map[r].length; c++) {
            if (map[r][c] === 'S') return [r, c];
        }

}

function travseMap(location, distance, directionIncoming) {

    let originalTile = map[location[0]][location[1]];
    //console.log(location, originalTile, distance, directionIncoming);
    if (typeof (originalTile) === 'number') return distance;

    distance++
    map[location[0]][location[1]] = distance;

    // N -- means we are going south because we came from the north
    // S -- means we are going north because we came from the south
    // W -- means we are going east because we came from the West
    // E -- means we are going West because we came from the East
    let directionToCameFrom = '';
    switch (originalTile) {
        case '|':
            directionToCameFrom = directionIncoming === 'N' ? 'N' : 'S'
            break;
        case '-':
            directionToCameFrom = directionIncoming === 'E' ? 'E' : 'W'
            break;
        case 'L':
            directionToCameFrom = directionIncoming === 'N' ? 'W' : 'S'
            break;
        case 'J':
            directionToCameFrom = directionIncoming === 'N' ? 'E' : 'S'
            break;
        case '7':
            directionToCameFrom = directionIncoming === 'S' ? 'E' : 'N'
            break;
        case 'F':
            directionToCameFrom = directionIncoming === 'S' ? 'W' : 'N'
            break;
        default:
            console.log('WTF', originalTile, directionToCameFrom, location, originalTile, distance, directionIncoming);
            break;

    }
    // N-- move south
    // S -- move North
    // W -- Move East
    // E -- Move West 
    switch (directionToCameFrom) {
        case 'N':
            return travseMap([location[0] + 1, location[1]], distance, directionToCameFrom);
        case 'S':
            return travseMap([location[0] - 1, location[1]], distance, directionToCameFrom)
        case 'W':
            return travseMap([location[0], location[1] + 1], distance, directionToCameFrom);
        case 'E':
            return travseMap([location[0], location[1] - 1], distance, directionToCameFrom);
        default:
            console.log('WTFD', originalTile, directionToCameFrom, location, originalTile, distance, directionIncoming);
    }
}

function OneCall(location, distance, directionIncoming) {

    while (true) {
        let originalTile = map[location[0]][location[1]];
        //console.log(location, originalTile, distance, directionIncoming);
        if (typeof (originalTile) === 'number') return distance;


        distance++
        map[location[0]][location[1]] = distance;

        // N -- means we are going south because we came from the north
        // S -- means we are going north because we came from the south
        // W -- means we are going east because we came from the West
        // E -- means we are going West because we came from the East
        switch (originalTile) {
            case '|':
                directionIncoming = directionIncoming === 'N' ? 'N' : 'S'
                break;
            case '-':
                directionIncoming = directionIncoming === 'E' ? 'E' : 'W'
                break;
            case 'L':
                directionIncoming = directionIncoming === 'N' ? 'W' : 'S'
                break;
            case 'J':
                directionIncoming = directionIncoming === 'N' ? 'E' : 'S'
                break;
            case '7':
                directionIncoming = directionIncoming === 'S' ? 'E' : 'N'
                break;
            case 'F':
                directionIncoming = directionIncoming === 'S' ? 'W' : 'N'
                break;
            default:
                console.log('WTF', originalTile, directionToCameFrom, location, originalTile, distance, directionIncoming);
                break;

        }
        // N-- move south
        // S -- move North
        // W -- Move East
        // E -- Move West 
        switch (directionIncoming) {
            case 'N':
                location = [location[0] + 1, location[1]];
                break;
            case 'S':
                location = [location[0] - 1, location[1]];
                break;
            case 'W':
                location = [location[0], location[1] + 1];
                break;
            case 'E':
                location = [location[0], location[1] - 1];
                break;
            default:
                console.log('WTFD', originalTile, directionToCameFrom, location, originalTile, distance, directionIncoming);
        }
    }
}

// create map 
input.forEach((line, i) => {
    map.push(line.split(''));
});

let startLocation = findS(map);


// kind of cheating but hey, we know in both scenarios S === F
map[startLocation[0]][startLocation[1]] = 'F';

let largestDistance = OneCall(startLocation, -1);

console.log(largestDistance || 'WTF')

console.log(Math.floor(++largestDistance / 2));


map.forEach(l => {
    console.log(l.join(''))
})