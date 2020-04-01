function calculateMinTimeTransp() {
    let line = 0;
    let numArr = [[]];
    let inputs = document.querySelectorAll("#tableBody input"); /*получаем все input из таблицы*/
    let size = Math.sqrt(inputs.length); /*размер матрицы*/
    inputs.forEach((input, index) => {
        if (index % size === 0 && index !== 0) {
            line++;
            numArr.push([])
        }
        let num = parseInt(input.value);
        if (num !== 0 && !num) {
            return;
        }
        numArr[line].push(num)
    });
    let columns = [0];
    let sum = 0;
    let outStr = "";
    for (let i = 0; i < size; i++) {
        let values = getMinValues(columns, numArr);
        outStr += "P" + (values.rowMin + 1) + " - (" + values.min + ") - ";
        if (i + 1 === size) outStr += "P" + (values.colMin + 1);
        columns.push(values.colMin);
        sum += values.min;
    }
    outStr += " = " + sum + " мин.";
    document.getElementById("resMin").innerHTML = "Минимальное время транспортировки: " + outStr;
}

function calculateMaxTimeTransp() {
    let line = 0;
    let numArr = [[]];
    let inputs = document.querySelectorAll("#tableBody input");
    let size = Math.sqrt(inputs.length);
    inputs.forEach((input, index) => {
        if (index % size === 0 && index !== 0) {
            line++;
            numArr.push([])
        }
        let num = parseInt(input.value);
        if (num !== 0 && !num) {
            return;
        }
        numArr[line].push(num)
    });
    let columns = [0];
    let sum = 0;
    let outStr = "";
    for (let i = 0; i < size; i++) {
        let values = getMaxValues(columns, numArr);
        outStr += "P" + (values.rowMax + 1) + " - (" + values.max + ") - ";
        if (i + 1 === size) outStr += "P" + (values.colMax + 1);
        columns.push(values.colMax);
        sum += values.max;
    }
    outStr += " = " + sum + " мин.";
    document.getElementById("resMax").innerHTML = "Максимальное время транспортировки: " + outStr;
}

function exhaustiveSearchMethodMin() {
    let line = 0;
    let numArr = [[]];
    let inputs = document.querySelectorAll("#tableBody input");
    let size = Math.sqrt(inputs.length);
    inputs.forEach((input, index) => {
        if (index % size === 0 && index !== 0) {
            line++;
            numArr.push([])
        }
        let num = parseInt(input.value);
        if (num !== 0 && !num) {
            return;
        }
        numArr[line].push(num)
    });
    let columns = [0];
    let sum = 0;
    let outStr = "";
    for (let i = 0; i < size; i++) {
        let values = exhaustiveSearchMin(numArr, i);

        outStr += "P" + (values.rowMin + 1) + " - (" + values.min + ") - ";
        if (i + 1 === size) outStr += "P" + (values.colMin + 1);
        columns.push(values.colMin);
        sum += values.min;
    }
    outStr += " = " + sum + " мин.";
    document.getElementById("resMinExhaust").innerHTML = 'Минимальное время транспортировки (методом перебора): ' + outStr;
}

function exhaustiveSearchMethodMax() {
    let line = 0;
    let numArr = [[]];
    let inputs = document.querySelectorAll("#tableBody input");
    let size = Math.sqrt(inputs.length);
    inputs.forEach((input, index) => {
        if (index % size === 0 && index !== 0) {
            line++;
            numArr.push([])
        }
        let num = parseInt(input.value);
        if (num !== 0 && !num) {
            return;
        }
        numArr[line].push(num)
    });
    let columns = [0];
    let sum = 0;
    let outStr = "";
    for (let i = 0; i < size; i++) {
        let values = exhaustiveSearchMax(numArr, i);

        outStr += "P" + (values.rowMax + 1) + " - (" + values.max + ") - ";
        if (i + 1 === size) outStr += "P" + (values.colMax + 1);
        columns.push(values.colMax);
        sum += values.max;
    }
    outStr += " = " + sum + " мин.";
    document.getElementById("resMaxExhaust").innerHTML = 'Максимальное  время транспортировки (методом перебора): ' + outStr;
}
function getMinValues(columns, numArr) {
    let size = numArr.length;
    let min = undefined;
    let colMin = 0;
    let rowMin = 0;
    let lastCol = columns[columns.length - 1];
    if (columns.length !== size) {
        for (let j = 0; j < size; j++) {
            if (j !== lastCol) {
                let check = false;
                columns.forEach(el => {
                    if (j === el) check = true;
                });
                if (!check && (numArr[lastCol][j] < min || min === undefined)) {
                    min = numArr[lastCol][j];
                    colMin = j;
                    rowMin = lastCol;
                }
            }
        }
    } else {
        min = numArr[lastCol][columns[0]];
        colMin = columns[0];
        rowMin = lastCol;
    }
    return {min, colMin, rowMin}
}

function getMaxValues(columns, numArr) {
    let size = numArr.length;
    let max = undefined;
    let colMax = 0;
    let rowMax = 0;
    let lastCol = columns[columns.length - 1];
    if (columns.length !== size) {
        for (let j = 0; j < size; j++) {
            if (j !== lastCol) {
                let check = false;
                columns.forEach(el => {
                    if (j === el) check = true;
                });
                if (!check && (numArr[lastCol][j] > max || max === undefined)) {
                    max = numArr[lastCol][j];
                    colMax = j;
                    rowMax = lastCol;
                }
            }
        }
    } else {
        max = numArr[lastCol][columns[0]];
        colMax = columns[0];
        rowMax = lastCol;
    }
    return {max, colMax, rowMax}
}

function exhaustiveSearchMin(numArr, i) {
    let rowMin;
    let colMin;
    let min;
    if ((i + 1) !== numArr.length) {
        min = numArr[i][i + 1];
        rowMin = i;
        colMin = i + 1;
        numArr[i].forEach((el, index) => {
            if (index > i && el < min) {
                min =  el;
                colMin = index;
            }
        });
    } else {
        min = numArr[i][0];
        rowMin = i;
        colMin = 0;
    }
    return {min, rowMin, colMin}
}

function exhaustiveSearchMax(numArr, i) {
    let rowMax;
    let colMax;
    let max;
    if ((i + 1) !== numArr.length) {
        max = numArr[i][i + 1];
        rowMax = i;
        colMax = i + 1;
        numArr[i].forEach((el, index) => {
            if (index > i && el > max) {
                max =  el;
                colMax = index;
            }
        });
    } else {
        max = numArr[i][0];
        rowMax = i;
        colMax = 0;
    }
    return {max, rowMax, colMax}
}
