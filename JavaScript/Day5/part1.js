import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);


function findPlace(arr, element) {
    let record = arr.find(x => {
        if (element >= x.startIndex && element <= x.endIndex) {
            return true;
        }
    });

    return (record ? record.diff + element : element)

}

let seeds = input[0].split(' ').map(s => +s);

let seedToSoil = [];
let soilToFertilizer = [];
let fertilizerToWater = [];
let waterToLight = [];
let lightToTemperature = [];
let temperatureToHumidity = [];
let humidityToLocation = [];
seeds.splice(0, 1);
let dataIndex = 3; // seed-soil 
while (input[dataIndex] !== '') {
    let parts = input[dataIndex++].split(' ').map(x => Number(x));

    seedToSoil.push({
        startIndex: parts[1],
        endIndex: parts[1] + parts[2] - 1,
        startDest: parts[0],
        diff: parts[0] - parts[1]
    });

}


// skip 2 lines, soil-to-fertilizer map
dataIndex += 2;
while (input[dataIndex] !== '') {
    let parts = input[dataIndex++].split(' ').map(x => Number(x));

    soilToFertilizer.push({
        startIndex: parts[1],
        endIndex: parts[1] + parts[2] - 1,
        startDest: parts[0],
        diff: parts[0] - parts[1]
    });
}

// skip 2 lines, fertilizer-to-water map
dataIndex += 2;
while (input[dataIndex] !== '') {
    let parts = input[dataIndex++].split(' ').map(x => Number(x));

    fertilizerToWater.push({
        startIndex: parts[1],
        endIndex: parts[1] + parts[2] - 1,
        startDest: parts[0],
        diff: parts[0] - parts[1]
    });
}

// skip 2 lines, water-to-light map
dataIndex += 2;
while (input[dataIndex] !== '') {
    let parts = input[dataIndex++].split(' ').map(x => Number(x));

    waterToLight.push({
        startIndex: parts[1],
        endIndex: parts[1] + parts[2] - 1,
        startDest: parts[0],
        diff: parts[0] - parts[1]
    });
}

// skip 2 lines, light-to-temperature map
dataIndex += 2;
while (input[dataIndex] !== '') {
    let parts = input[dataIndex++].split(' ').map(x => Number(x));

    lightToTemperature.push({
        startIndex: parts[1],
        endIndex: parts[1] + parts[2] - 1,
        startDest: parts[0],
        diff: parts[0] - parts[1]
    });
}

// skip 2 lines, temperature-to-humidity
dataIndex += 2;
while (input[dataIndex] !== '') {
    let parts = input[dataIndex++].split(' ').map(x => Number(x));

    temperatureToHumidity.push({
        startIndex: parts[1],
        endIndex: parts[1] + parts[2] - 1,
        startDest: parts[0],
        diff: parts[0] - parts[1]
    });
}

// skip 2 lines, humidity-to-location map
dataIndex += 2;
while (dataIndex < input.length) {
    let parts = input[dataIndex++].split(' ').map(x => Number(x));

    humidityToLocation.push({
        startIndex: parts[1],
        endIndex: parts[1] + parts[2] - 1,
        startDest: parts[0],
        diff: parts[0] - parts[1]
    });
}

console.table(seeds)
console.table(seedToSoil)
console.table(soilToFertilizer)
console.table(fertilizerToWater)
console.table(waterToLight)
console.table(lightToTemperature)
console.table(temperatureToHumidity)
console.table(humidityToLocation)

let minLocation = 0;
seeds.forEach((seed, index) => {
    let soil = findPlace(seedToSoil, seed);
    let fertilizer = findPlace(soilToFertilizer, soil);
    let water = findPlace(fertilizerToWater, fertilizer);
    let light = findPlace(waterToLight, water);
    let temperature = findPlace(lightToTemperature, light);
    let humidity = findPlace(temperatureToHumidity, temperature);
    let location = findPlace(humidityToLocation, humidity);

    if (location < minLocation || index === 0) {
        console.log(`location changed from ${minLocation} to ${location}`)
        minLocation = location;
    }
});

console.log(minLocation);





