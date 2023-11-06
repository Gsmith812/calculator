const add = (first, second) => first + second;
const subtract = (first, second) => first - second;
const multiply = (first, second) => first * second;
const divide = (first, second) => first / second;

let firstOperand = 0;
let secondOperand;
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