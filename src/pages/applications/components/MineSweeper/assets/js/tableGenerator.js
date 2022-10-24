var firstPrimeNumbers = [3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,
    103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,
    199,211,223,227,229,233,239,241,251];
var secondPrimeNumbers = [257,263,269,271,277,281,283,293,307,311,
    313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,
    433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,
    563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,
    673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,
    811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,
    941,947,953,967,971,977,983,991,997];
var newGameNumber = 1;
var cellsRowFormatArray = [];
// The cell class
class Cell {
    constructor(coord, id) {
        this.address = coord;
        this.uniqueKey = id;
        this.minesAround = 0;
        this.neighborCells = [];
        this.isMine = false;
        this.isMarked = false;
        this.isRevealed = false;
    }
}

// Generates a random number, from zero or one, within the given range
function randomNumber(range, fromOne) {
    var random = Math.ceil(Math.random()*range);
    if (!fromOne) {
        random = random%range;
    }
    return random;
}

// Adds all numbers in an array
function sumArrayElements(array) {
    var reducer = (previousValue, currentValue) => previousValue + currentValue;
    var sum = array.reduce(reducer);
    return sum;
}

// Takes two arrays and checks wether they are equal
function checkArraysEquality(first, second) {
    var logArray = [0];
    var logResult = 0;
    var loopRange = Math.max(first.length, second.length);

    for (let i = 0; i < loopRange; i++) {
    if (first[i] != second[i]) {
        logArray.push(1);
    } else {
        logArray.push(0);
    }    
    }
    
    logResult = sumArrayElements(logArray);
    return (logResult == 0 ? true : false);
}

// Takes a cell object and the table dimensions,
// then calculates "just the addresses" of the cells around and set the neighborCells property
function createNeighborCells (cell, rows, cols) {
    var coordinate = cell.address;
    var neighbors = [];
    for (let i = Math.max(0, (coordinate[0]-1)); i <= Math.min((rows-1), (coordinate[0]+1)) ; i++) {
        for (let j = Math.max(0, (coordinate[1]-1)); j <= Math.min((cols-1), (coordinate[1]+1)) ; j++) {
            neighbors.push([i, j]);
        }
    }
    var filtered = neighbors.filter(address => {
    return !checkArraysEquality(address, coordinate);
    });
    cell.neighborCells = filtered;
}

// Takes a cell object, and based on the neighbor addresses,
// counts mines around it within the cellsArray
function countMinesAround(cell) {
    cell.neighborCells.forEach(neighbor => {
        cellsRowFormatArray.forEach(rowObj => {
            rowObj.row.forEach(cellObj => {
                if(checkArraysEquality(neighbor, cellObj.address) && cellObj.isMine) {
                    cell.minesAround++;
                } 
            });
        });
    });
}


// Takes the cellsArray and the number of mines we wanna add,
// then adds mines in a random order
function addMines(array, mines) {
    for (let i = 0; i < mines; i++) {
        var randomCoord = [];
        randomCoord.push(randomNumber(array.length, false));
        randomCoord.push(randomNumber(array[0].row.length, false));
        array.forEach(rowObj => {
            rowObj.row.forEach(cellObj => {
                if (checkArraysEquality(randomCoord, cellObj.address)) {
                    if (!cellObj.isMine) cellObj.isMine = true;
                    // if the cell was already a mine, repeats the for loop
                    else i--;
                }
            });
        });        
    }
}

// Takes the dimensions, and generates the cellsArray in a row format
function createCellsArray(rows, cols) {
    for (let i = 0; i < rows; i++) {
        var tempRowArray = [];
        var tempRowObject = {};
        for (let j = 0; j < cols; j++) {
            var cellUniqueKey = firstPrimeNumbers[i] * secondPrimeNumbers[j] * newGameNumber;
            tempRowArray.push(new Cell([i, j], cellUniqueKey));
            tempRowObject.id = cellUniqueKey * (-2);
            tempRowObject.row = tempRowArray;
        }
        cellsRowFormatArray.push(tempRowObject);     
    }
}

// Filters values and puts them in the allowed range
function filterValue(value, min, max) {
    var filtered = Math.max(min, value);
    return Math.min(max, filtered);
}

// The main execution function
function startNewGame(rows, cols, mines) {
    var maxMines = rows*cols - 1;
    var minMines = Math.ceil(maxMines/5);
    var filteredMines = filterValue(mines, minMines, maxMines);
    if (mines > maxMines) console.log(`Invalid value: ${mines} for mines... Mines set to maximum of ${maxMines}`);
    if (mines < minMines) console.log(`Invalid value: ${mines} for mines... Mines set to minimum of ${minMines}`);
    // Resetting the cellsArray for a new game
    cellsRowFormatArray = [];
    createCellsArray(rows, cols);
    addMines(cellsRowFormatArray, filteredMines);

    cellsRowFormatArray.forEach(rowObj => {
        rowObj.row.forEach(cellObj => {              
            createNeighborCells(cellObj, rows, cols);
            countMinesAround(cellObj);
        });
    });
    newGameNumber++;
    return cellsRowFormatArray;
}

module.exports = startNewGame;