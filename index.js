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
    if(e.target.innerText === '.' && currOperand.split('').includes('.')){
        return currOperand;
    }
    if(currOperand === '0') {
        if(e.target.innerText === '.'){
            currOperand = currOperand + e.target.innerText;
        } else {
            currOperand = e.target.innerText;
        }
    } else {
        currOperand = currOperand + e.target.innerText;
    }
    
    currDisplay.innerText = currOperand;
}

// Grab all the operations buttons

const buttons = Array.from(document.querySelectorAll('button'));
const numbers = buttons.filter(button => parseInt(button.innerText) || parseInt(button.innerText) === 0 || button.innerText === '.');
const clearBtn = buttons.filter(button => button.innerText === 'Clear');
const deleteBtn = buttons.filter(button => button.innerText === 'Delete');

// Delete buttons

clearBtn[0].addEventListener('click', e => {
    currOperand = '0';
    currDisplay.innerText = currOperand;    
})

deleteBtn[0].addEventListener('click', e => {
    if(currDisplay.textContent.length === 1) {
        currOperand = '0';
        currDisplay.innerText = currOperand;
    } else {
        currDisplay.innerText = currDisplay.innerText.slice(0, -1);
        currOperand = currDisplay.innerText;
    }

})

// Display

const currDisplay = document.querySelector('.currValue');

currDisplay.innerText = currOperand;

numbers.map(number => {
    number.addEventListener('click',handleNumbers)
});
