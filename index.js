const add = (first, second) => first + second;
const subtract = (first, second) => first - second;
const multiply = (first, second) => first * second;
const divide = (first, second) => first / second;

let currOperand = '0';
let prevOperand;
let operator;

const operate = (operator, first, second) => {
    switch(operator){
        case '+':
            return add(first, second);
        case '-':
            return subtract(first, second);
        case '*':
            return multiply(first, second);
        case '/':
            return divide(first, second);
    }
}

// Handler Functions for events

const handleNumbers = input => {

    if(input === '.' && currOperand.split('').includes('.')){
        return currOperand;
    }
    if(currOperand === '0') {
        if(input === '.'){
            currOperand = currOperand + input;
        } else {
            currOperand = input;
        }
    } else {
        currOperand = currOperand + input;
    }
    
    currDisplay.textContent = currOperand;
}

const handleEquals = () => {
    if(prevOperand && currOperand && operator){
        operationDisplay.textContent += ` ${currOperand} =`;
        currOperand = operate(operator, parseFloat(prevOperand), parseFloat(currOperand));
        currDisplay.textContent = currOperand;
        prevOperand = null;
    }
}

const handleOperators = input => {
    let selected = buttons.filter(button => button.id === input);
    operator = selected[0].id;
    if(!prevOperand) {
        prevOperand = currOperand;
        currOperand = '0'
        currDisplay.textContent = currOperand;
        operationDisplay.textContent = `${prevOperand} ${selected[0].textContent}`
    } else {
        prevOperand = operate(operator, parseFloat(prevOperand), parseFloat(currOperand));
        operationDisplay.textContent = `${prevOperand} ${selected[0].textContent}`;
        currOperand = '0';   
        currDisplay.textContent = currOperand;        
    }
}

const handleClear = () => {
    currOperand = '0';
    prevOperand = null;
    operator = null;
    currDisplay.textContent = currOperand;
    operationDisplay.textContent = ''; 
}

const handleDelete = () => {
    if(currDisplay.textContent.length === 1) {
        currOperand = '0';
        currDisplay.textContent = currOperand;
    } else {
        currDisplay.textContent = currDisplay.textContent.slice(0, -1);
        currOperand = currDisplay.textContent;
    }
}
// Grab all the operations buttons

const buttons = Array.from(document.querySelectorAll('button'));
const numbers = buttons.filter(button => parseInt(button.textContent) || parseInt(button.textContent) === 0 || button.textContent === '.');
const clearBtn = buttons.filter(button => button.textContent === 'Clear');
const deleteBtn = buttons.filter(button => button.textContent === 'Delete');

// Delete buttons

clearBtn[0].addEventListener('click', handleClear);

deleteBtn[0].addEventListener('click', handleDelete);

// Operator buttons

const operationsBtns = buttons.filter(button => button.id && button.id !== 'equals');
const equalsBtn = document.querySelector('#equals');

operationsBtns.forEach(button => {
    button.addEventListener('click', e => handleOperators(e.target.id));
});

equalsBtn.addEventListener('click', handleEquals)

// Display

const currDisplay = document.querySelector('.currValue');
const operationDisplay = document.querySelector('.operation');

currDisplay.textContent = currOperand;

numbers.map(number => {
    number.addEventListener('click', e => handleNumbers(e.target.textContent));
});

addEventListener('keydown', e => {
    if('0' <= e.key && e.key <= '9') {
        handleNumbers(e.key);
    }
    switch(e.key){
        case '+':
            handleOperators(e.key);            break;
        case '-':
            handleOperators(e.key);            break;
        case '*':
            handleOperators(e.key);            break;
        case '/':
            e.preventDefault();
            handleOperators(e.key);
            break;
        case '=':
            handleEquals();
            break;
        case '.':
            handleNumbers(e.key);
            break;
        case 'Enter':
            handleEquals();
            break;
        case 'Backspace':
            handleDelete();
            break;
        case 'Delete':
            handleDelete();
            break;
        case 'Escape':
            handleClear();
            break;
    };
});