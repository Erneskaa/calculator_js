'use strict';

const result = document.querySelector('.result'),
    expression = document.querySelector('.expression');

let ex = '';
let runningTotal = 0;
let buffer = '0';
let previousOperator;




function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    result.innerText = buffer;
    expression.innerText = ex;
}


function handleSymbol(symbol) {
    switch (symbol) {
        case 'AC':
            ex = '0';
            buffer = '0';
            runningTotal = 0;

        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }

            flushOperation(parseInt(buffer));
            ex = runningTotal;
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
                ex = buffer;
            }
            break;
        case '×':
        case '÷':
        case '+':
        case '−':
            handleMath(symbol);
            break;
    }
}


function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    ex += symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }
    else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
    else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
        if (ex === '0') {
            ex = numberString;
        } else {
            ex += numberString;

        }
    } else {
        buffer += numberString;
        ex += numberString;
    }


}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}

init();