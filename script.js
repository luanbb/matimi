const display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === '0' && number !== '.') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%', '.'];

    // Se o display estiver vazio, não permite iniciar com operadores (exceto se for regra específica)
    if (display.value === '' && operator !== '-') return;

    // Impede dois operadores seguidos
    if (operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        // Substituímos o símbolo visual de porcentagem por /100 para o eval entender
        let expression = display.value.replace(/%/g, '/100');
        
        // O eval processa a string matemática
        const result = eval(expression);
        
        if (result === Infinity || isNaN(result)) {
            display.value = "Erro";
        } else {
            display.value = Number(result.toFixed(8)); // Limita casas decimais
        }
    } catch {
        display.value = "Erro";
    }
}