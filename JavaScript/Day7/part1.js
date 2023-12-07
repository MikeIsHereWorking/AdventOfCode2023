import TextInputReader from '../Helpers/TextInputReader.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'data.data');

const input = TextInputReader(fileName);

const HandRank = {
    "HighCard": 0,
    "Pair": 1,
    "TwoPair": 2,
    "ThreeOfAKind": 3,
    "FullHouse": 4,
    "FourOfAKind": 5,
    "FiveOfAKind": 6

}

function convertToValue(card) {
    if (card >= '2' && card <= '9')
        return Number(card);
    switch (card) {
        case 'T': return 10
        case 'J': return 11
        case 'Q': return 12
        case 'K': return 13
        case 'A': return 14
        default: return 0
    }


}

function convertHand(hand) {
    return hand.split('').map(c => convertToValue(c));
}

function typeOfHand(convertedValues) {
    let convertHand = new Map();

    convertedValues.forEach(rank => {
        if (convertHand.has(rank)) {
            convertHand.set(rank, convertHand.get(rank) + 1);
        } else {
            convertHand.set(rank, 1);
        }
    });


    // console.log(convertHand, new Set(convertHand.values()), new Set(convertHand.values()).has(3))
    switch (convertHand.size) {
        case 1: return 'FiveOfAKind'
        case 2: return new Set(convertHand.values()).has(3) ? 'FullHouse' : 'FourOfAKind';
        case 3: return new Set(convertHand.values()).has(3) ? 'ThreeOfAKind' : 'TwoPair';
        case 4: return 'Pair'
        case 5: return 'HighCard'
        default: return '';
    }


}

/*
for each line 
create object 
    handString 
    handArrayValue 
    handRank
    BetSize

sort Object 
    handRank

    if Same 
        loop through Array until diff
*/

let hands = []
input.forEach(line => {
    let sides = line.split(' ');
    let handString = sides[0];
    let betSize = Number(sides[1]);
    let handValues = convertHand(handString);

    hands.push({
        "handString": handString,
        "handValues": handValues,
        "handRank": HandRank[typeOfHand(handValues)],
        "betSize": betSize
    });
});

hands.sort((a, b) => {
    let ranks = a.handRank - b.handRank;
    if (ranks !== 0) return ranks;

    for (let i = 0; i < a.handValues.length; i++) {
        if (a.handValues[i] !== b.handValues[i]) return a.handValues[i] - b.handValues[i];
    }
});


console.log(hands.reduce((t, c, i) => t + c.betSize * (i + 1), 0));



//console.log(HandRank[typeOfHand(convertHand('2TKQ3'))]);
//console.log(HandRank[typeOfHand('2T2Q3')]);
// console.log(HandRank[typeOfHand('2TKK2')]);
// console.log(HandRank[typeOfHand('222Q3')]);
// console.log(HandRank[typeOfHand('22233')]);
// console.log(HandRank[typeOfHand('22232')]);
// console.log(HandRank[typeOfHand('22222')]);

/*
for each line 
create object 
    handString 
    handArrayValue 
    handRank
    BetSize

sort Object 
    handRank

    if Same 
        loop through Array until diff
*/




/*
abcde - 5 -- 1,1,1,1,1
aabcd - 4 -- 2,1,1,1
aabbc - 3 -- 2,2,1
aaabc - 3 -- 3,1,1
aaabb - 2 -- 3,2
aaaab - 2 - 4,1
aaaaa - 1 - 5

*/