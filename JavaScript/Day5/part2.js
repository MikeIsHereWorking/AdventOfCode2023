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

function mergeArrays(arrys) {

    let results = [arrys[0]];
    for (let i = 1; i < arrys.length; i++) {
        if (arrys[i][0] == results[results.length - 1][1] + 1) {
            results[results.length - 1][1] = arrys[i][1]
        } else {
            results.push(arrys[i]);
        }
    }
    return results;
}

function mapSections(array, elementStart, elementEnd) {
    // Get the subSection where 
    // element <array[end]
    let hits = array.filter(x => elementStart <= x.endIndex && elementEnd >= x.startIndex);
    let results = [];
    for (let h of hits) {
        if (elementStart >= h.startIndex && elementEnd <= h.endIndex) {  // Inside -- Inside
            results.push([elementStart + h.diff, elementEnd + h.diff]);
            // signal end
            elementStart = elementEnd + 1;
            break;
        }

        if (elementStart >= h.startIndex && elementEnd > h.endIndex) {  // Inside -- Outside
            results.push([elementStart + h.diff, h.endIndex + h.diff]);
            elementStart = h.endIndex + 1;
        }

        if (elementStart < h.startIndex && elementEnd <= h.endIndex) {  // Outside -- Inside
            results.push([elementStart, h.startIndex - 1]);
            results.push([h.startIndex + h.diff, elementEnd + h.diff]);
            // signal end
            elementStart = elementEnd + 1;
            break;
        }

        if (elementStart < h.startIndex && elementEnd > h.endIndex) {  // Outside -- Outside
            results.push([elementStart, h.startIndex - 1]);
            results.push([h.startIndex + h.diff, h.endIndex + h.diff]);
            elementStart = h.endIndex + 1;
        }
    }

    // left over
    if (elementStart <= elementEnd)
        results.push([elementStart, elementEnd]);

    return results.sort((a, b) => a[0] - b[0]);

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

seedToSoil.sort((a, b) => a.startIndex - b.startIndex);
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

soilToFertilizer.sort((a, b) => a.startIndex - b.startIndex);
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

fertilizerToWater.sort((a, b) => a.startIndex - b.startIndex);

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

waterToLight.sort((a, b) => a.startIndex - b.startIndex);

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

lightToTemperature.sort((a, b) => a.startIndex - b.startIndex);

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

temperatureToHumidity.sort((a, b) => a.startIndex - b.startIndex);

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

humidityToLocation.sort((a, b) => a.startIndex - b.startIndex);

// console.table(seeds)
// console.table(seedToSoil)
// console.table(soilToFertilizer)
// console.table(fertilizerToWater)
// console.table(waterToLight)
// console.table(lightToTemperature)
// console.table(temperatureToHumidity)
// console.table(humidityToLocation)

let minLocation = [];
for (let index = 0; index < seeds.length; index += 2) {
    let soilResults = mapSections(seedToSoil, seeds[index], seeds[index] + seeds[index + 1])
    soilResults = mergeArrays(soilResults);
    //console.log(soilResults)


    let fertilizerResults = [];
    soilResults.forEach(r => {
        fertilizerResults.push(...mapSections(soilToFertilizer, r[0], r[1]));
        fertilizerResults = mergeArrays(fertilizerResults);
    });

    //console.log(fertilizerResults);

    let waterResults = [];
    fertilizerResults.forEach(r => {
        waterResults.push(...mapSections(fertilizerToWater, r[0], r[1]));
        waterResults = mergeArrays(waterResults);
    });

    let lightResults = [];
    waterResults.forEach(r => {
        lightResults.push(...mapSections(waterToLight, r[0], r[1]));
        lightResults = mergeArrays(lightResults);
    });

    let temperatureResults = [];
    lightResults.forEach(r => {
        temperatureResults.push(...mapSections(lightToTemperature, r[0], r[1]));
        temperatureResults = mergeArrays(temperatureResults);
    });

    let humidityResults = [];
    temperatureResults.forEach(r => {
        humidityResults.push(...mapSections(temperatureToHumidity, r[0], r[1]));
        humidityResults = mergeArrays(humidityResults);
    });

    let locationResults = [];
    humidityResults.forEach(r => {
        locationResults.push(...mapSections(humidityResults, r[0], r[1]));
        locationResults = mergeArrays(locationResults);
    });

    minLocation.push(locationResults[0][0]);
    console.log(index, locationResults)
    //console.log(index, 'MIN Location', minLocation);
}



// let soil = findPlace(seedToSoil, seed);
// let fertilizer = findPlace(soilToFertilizer, soil);
// let water = findPlace(fertilizerToWater, fertilizer);
// let light = findPlace(waterToLight, water);
// let temperature = findPlace(lightToTemperature, light);
// let humidity = findPlace(temperatureToHumidity, temperature);
// let location = findPlace(humidityToLocation, humidity);



//console.log(minLocation);





