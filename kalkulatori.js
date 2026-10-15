const display = document.getElementById("display");

function isOperator(char) {
    return /[+\-*/%^]/.test(char);
}

function appendToDisplay(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    if (value === ".") {
        const lastPart = display.value.split(/[+\-*/%^]/).at(-1);
        if (lastPart.includes(".")) return;
    }

    if (isOperator(value)) {
        const lastChar = display.value.slice(-1);

        if (display.value === "" && value !== "-") {
            return;
        }

        if (isOperator(lastChar)) {
            if (value === "-" && lastChar !== "-") {
                display.value += value;
                return;
            }

            display.value = display.value.slice(0, -1) + value;
            return;
        }
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    if (display.value === "Error") {
        clearDisplay();
        return;
    }

    display.value = display.value.slice(0, -1);
}

function squareRoot() {
    try {
        if (display.value === "") return;

        const number = Number(display.value);

        if (Number.isNaN(number) || number < 0) {
            display.value = "Error";
            return;
        }

        display.value = String(Math.sqrt(number));
    } catch {
        display.value = "Error";
    }
}

function formatResult(value) {
    if (!Number.isFinite(value)) return "Error";

    const rounded = Number(value.toFixed(10));
    return String(rounded);
}

function calculate() {
    try {
        let expression = display.value.trim();
        if (!expression) return;

        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

        const result = Function('"use strict"; return (' + expression + ')')();
        display.value = formatResult(result);
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || "+-*/.%^".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key.toLowerCase() === "c") {
        clearDisplay();
    }
});