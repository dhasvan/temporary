document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let operator = null;
    let firstValue = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const number = button.dataset.number;
            const operation = button.dataset.operation;

            if (number !== undefined) {
                if (shouldResetDisplay) {
                    currentInput = number;
                    shouldResetDisplay = false;
                } else {
                    currentInput += number;
                }
                display.textContent = currentInput;
            }

            if (operation) {
                if (currentInput !== '') {
                    firstValue = parseFloat(currentInput);
                    operator = operation;
                    display.textContent += ` ${operator} `;
                    currentInput = '';
                }
            }

            if (action === 'calculate') {
                const secondValue = parseFloat(currentInput);
                if (operator && firstValue !== null && currentInput !== '') {
                    let result;
                    if (operator === '+') result = firstValue + secondValue;
                    else if (operator === '-') result = firstValue - secondValue;
                    else if (operator === '*') result = firstValue * secondValue;
                    else if (operator === '/') result = firstValue / secondValue;

                    display.textContent += ` = ${result}`;
                    currentInput = result.toString();
                    operator = null;
                    firstValue = null;
                    shouldResetDisplay = true;
                }
            }
            if (action === 'clear') {
                currentInput = '';
                operator = null;
                firstValue = null;
                display.textContent = '0';
            }
        });
    });
});
