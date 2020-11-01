const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const result = document.getElementById('result');
const display = document.getElementById('display');
const sqrtButton = document.getElementById('sqrt');
const plus_Minus = document.getElementById('plus-minus');
const infoButton = document.getElementById('butn_info');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

function displayError(){
    display.value = 'error';
}

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    MemoryCurrentNumber = MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;

    display.value = MemoryCurrentNumber;
  } else {
        MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
        MemoryCurrentNumber += +localOperationMemory;
        MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;
    } else if (MemoryPendingOperation === '-') {
        MemoryCurrentNumber -= +localOperationMemory;
        MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;
    } else if (MemoryPendingOperation === '*') {

        MemoryCurrentNumber *= +localOperationMemory;
        MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;
    } else if (MemoryPendingOperation === '/') {

        MemoryCurrentNumber /= +localOperationMemory;
        MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;

    } 
    
    else if(MemoryPendingOperation === '√') {
        MemoryCurrentNumber = sqrt(MemoryCurrentNumber, localOperationMemory);
        if (typeof(MemoryCurrentNumber) === number) {
          MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;
        }
        
    } else if(MemoryPendingOperation === '^') {

        MemoryCurrentNumber **= localOperationMemory ;
        MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;

    } else {
        MemoryCurrentNumber = +localOperationMemory;
        MemoryCurrentNumber = Math.round(MemoryCurrentNumber*1000000000000000)/1000000000000000;

    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
}



function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}

function plusMinus(){
    display.value *= -1;
}

function sqrt(x,y){
    if (x > -1){
        if (Number.isInteger(Math.pow(x, 1/y))){
            return Math.pow(x, 1/y); }
         else {
           return Math.pow(x, 1/y).toFixed(10);
        }
    } else {
      return ('Error');
    }
}


function info() {
  alert('1) Чтобы посчитать n-ый корень числа, нужно нажать на "√" и цифру(число n)\n2) При попытке найти корень отрицательного числа, калькулятор выдаст ошибку - "Error"\n3) Для ввода отрицательных чисел нужно ввести число и нажать на кнопку "+/-"');
}
plus_Minus.addEventListener('click', plusMinus);
infoButton.addEventListener('click', info);

