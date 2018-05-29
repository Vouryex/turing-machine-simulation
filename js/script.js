const inputTapeInit = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
let inputTape = inputTapeInit;
let inputTapeDOM = "";
let inputHead = -1;

let displayInputTape = () => {
    inputTapeDOM = "";
    for(let i = 0; i < inputTape.length; i++) {
        let active = "";
        if(i === inputHead) {
            active = "active";
        }
        inputTapeDOM += `<div id='input' class=${active}>${inputTape.charAt(i)}</div>`;
    }

    document.getElementById("input_tape").childNodes[1].innerHTML = inputTapeDOM;
};

let initConfig = () => {
    firstVal = document.getElementById("first_value").value;
    secondVal = document.getElementById("second_value").value;
    document.getElementById("first_value").value = "";
    document.getElementById("second_value").value = "";

    inputTape = inputTapeInit;
    for(let i = 0; i < secondVal; i++) {
        inputTape = "1" + inputTape;
    }
    inputTape = "#" + inputTape;
    for(let i = 0; i < firstVal; i++) {
        inputTape = "1" + inputTape;
    }
    inputHead = 0;
    displayInputTape();
};

displayInputTape();


