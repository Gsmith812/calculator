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

// Create handler function for numbers buttons

const handleNumbers = e => {
    if(e.target.textContent === '.' && currOperand.split('').includes('.')){
        return currOperand;
    }
    if(currOperand === '0') {
        if(e.target.textContent === '.'){
            currOperand = currOperand + e.target.textContent;
        } else {
            currOperand = e.target.textContent;
        }
    } else {
        currOperand = currOperand + e.target.textContent;
    }
    
    currDisplay.textContent = currOperand;
}

// Grab all the operations buttons

const buttons = Array.from(document.querySelectorAll('button'));
const numbers = buttons.filter(button => parseInt(button.textContent) || parseInt(button.textContent) === 0 || button.textContent === '.');
const clearBtn = buttons.filter(button => button.textContent === 'Clear');
const deleteBtn = buttons.filter(button => button.textContent === 'Delete');

// Delete buttons

clearBtn[0].addEventListener('click', e => {
    currOperand = '0';
    prevOperand = null;
    operator = null;
    currDisplay.textContent = currOperand;
    operationDisplay.textContent = '';  
})

deleteBtn[0].addEventListener('click', e => {
    if(currDisplay.textContent.length === 1) {
        currOperand = '0';
        currDisplay.textContent = currOperand;
    } else {
        currDisplay.textContent = currDisplay.textContent.slice(0, -1);
        currOperand = currDisplay.textContent;
    }

})

// Operator buttons

const operationsBtns = buttons.filter(button => button.id && button.id !== 'equals');
const equalsBtn = document.querySelector('#equals');

operationsBtns.forEach(button => {
    button.addEventListener('click', e => {
        operator = e.target.id;
        if(!prevOperand) {
            prevOperand = currOperand;
            currOperand = '0'
            currDisplay.textContent = currOperand;
            operationDisplay.textContent = `${prevOperand} ${e.target.textContent}`
        } else {
            prevOperand = operate(operator, parseFloat(prevOperand), parseFloat(currOperand));
            operationDisplay.textContent = `${prevOperand} ${e.target.textContent}`;
            currOperand = '0';   
            currDisplay.textContent = currOperand;        
        }
    });
});

equalsBtn.addEventListener('click', e => {
    if(prevOperand && currOperand && operator){
        operationDisplay.textContent += ` ${currOperand} =`;
        currOperand = operate(operator, parseFloat(prevOperand), parseFloat(currOperand));
        currDisplay.textContent = currOperand;
        prevOperand = null;
    }
})

// Display

const currDisplay = document.querySelector('.currValue');
const operationDisplay = document.querySelector('.operation');

currDisplay.textContent = currOperand;

numbers.map(number => {
    number.addEventListener('click',handleNumbers)
});
