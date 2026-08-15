const display = document.getElementById("display");


function appendToDisplay(value) {
    display.value += value;
}


function clearDisplay() {
    display.value = "";
}


function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function squareRoot() {
    try {
        if (display.value === "") return;

        let number = parseFloat(display.value);

        if (number < 0) {
            display.value = "Error";
            return;
        }

        display.value = Math.sqrt(number);
    } catch {
        display.value = "Error";
    }
}


function calculate() {
    try {
        let expression = display.value;

        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/\^/g, '**');

        // Percentage
        expression = expression.replace(/(\d+)%/g, '($1/100)');

        let result = Function('"use strict"; return (' + expression + ')')();

        display.value = result;
    } catch {
        display.value = "Error";
    }
}


document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});