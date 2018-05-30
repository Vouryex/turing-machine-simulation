const inputTapeInit = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

class TuringMachine {
    constructor(inputTape, finiteControl) {
        this._inputTape = inputTape;
        this._inputTapeHead = 0;
        this._finiteControl = finiteControl;
    }

    inputTapeDOM() {
        let inputTapeDOM = "";
        for(let i = 0; i < this._inputTape.length; i++) {
            let active = "";
            if(i === this._inputTapeHead) {
                active = "active";
            }
            inputTapeDOM += `<div id='input' class=${active}>
                ${this._inputTape.charAt(i)}</div>`;
        }
        return inputTapeDOM;
    }

    nextConfig() {
        if(!this._finiteControl || this._finiteControl.atAcceptingState()) {
            return;
        }

        let inputSymbol = this._inputTape.charAt(this._inputTapeHead);
        let transition = this._finiteControl.getTransition(inputSymbol);
        console.log(transition);

        this._finiteControl.currState = transition.nextState;
        this._inputTape = setCharAt(this._inputTape, this._inputTapeHead,
            transition.update);
        if(transition.move === 'R') {
            this._inputTapeHead++;
        } else {
            this._inputTapeHead--;
        }

        if(this._finiteControl.atAcceptingState()) {
            console.log("Computation Finished");
        }
    }
}

class Transition {
    constructor(transition) {
        if(transition) {
            let transitionElements = transition.split(",");
            this._nextState = transitionElements[0];
            this._update = transitionElements[1];
            this._move = transitionElements[2];
        }
    }

    get nextState() {
        return this._nextState;
    }

    get update() {
        return this._update;
    }

    get move() {
        return this._move;
    }
}

class State {
    constructor(transitionString) {
        this._transitions = [];
        let transitionStringArr = transitionString.split(";");
        for(let i = 0; i < transitionStringArr.length; i++) {
            this._transitions.push(new Transition(transitionStringArr[i]));
        }
    }

    get transitions() {
        return this._transitions;
    }
}

class FiniteControl {
    constructor(transitionTable, startState, acceptingStates, alphabet) {
        this._states = FiniteControl.initTransitionTable(transitionTable);
        this._currState = startState;
        this._acceptingStates = acceptingStates;
        this._alphabet = alphabet;
    }

    static initTransitionTable(transitionTable) {
        let states = [];
        let transitionString = transitionTable.split("\n");
        for(let i = 0; i < transitionString.length; i++) {
            states.push(new State(transitionString[i]));
        }
        return states;
    }

    get states() {
        return this._states;
    }

    get currState() {
        return this._currState;
    }

    set currState(nextState) {
        this._currState = nextState;
    }

    get acceptingStates() {
        return this._acceptingStates;
    }

    get alphabet() {
        return this._alphabet;
    }

    getTransition(inputSymbol) {
        return this._states[this._currState].transitions[this._alphabet.indexOf(
            inputSymbol)];
    }

    atAcceptingState() {
        return this._acceptingStates.includes(this._currState);
    }
}

const displayInputTape = () => {
    let inputTapeDOM = turingMachine.inputTapeDOM();
    document.getElementById("input_tape").childNodes[1].innerHTML
        = inputTapeDOM;
};

const initConfig = (simulateSelect) => {
    if(simulateSelect === 1) {
        firstVal = document.getElementById("first_value").value;
        secondVal = document.getElementById("second_value").value;
        document.getElementById("first_value").value = "";
        document.getElementById("second_value").value = "";

        const transitionTable = "1,b,R;;;;\n"
                                + "1,1,R;2,1,R;;;\n"
                                + "3,#,R;;;;\n"
                                + "3,1,R;;4,1,R;;\n"
                                + ";;5,#,R;;\n"
                                + ";;6,1,L;;\n"
                                + ";7,#,L;;;\n"
                                + "7,1,L;8,#,R;;8,x,R;\n"
                                + "9,x,R;24,#,L;;;\n"
                                + "9,1,R;9,#,R;10,#,L;;\n"
                                + "10,1,L;11,#,R;;;\n"
                                + "12,x,L;18,#,R;;11,x,R;\n"
                                + "12,1,L;12,#,L;13,b,R;12,x,L;13,y,R\n"
                                + "14,y,R;15,#,L;;;\n"
                                + "14,1,R;14,#,R;12,1,L;14,x,R;\n"
                                + ";;16,b,R;;15,1,L\n"
                                + "16,1,R;17,#,R;;;\n"
                                + "17,1,R;11,#,R;;17,x,R;\n"
                                + "18,1,R;18,#,R;19,b,L;18,x,R;\n"
                                + "20,b,L;23,b,L;;;\n"
                                + "20,1,L;21,#,L;;;\n"
                                + "22,1,R;22,#,R;;21,x,L;\n"
                                + ";23,1,L;;18,1,R;\n"
                                + "23,1,L;7,#,L;;;\n"
                                + ";25,#,R;;24,1,L;";

        inputTape = initInputTape(firstVal, secondVal);
        finiteControl = new FiniteControl(transitionTable, 0, ["25"],
            ['1', '#', 'b', 'x', 'y']);
        turingMachine = new TuringMachine(inputTape, finiteControl);
    }

    displayInputTape();
};

const initInputTape = (firstVal, secondVal) => {
    let inputTape = inputTapeInit;
    for(let i = 0; i < secondVal; i++) {
        inputTape = "1" + inputTape;
    }
    inputTape = "#" + inputTape;
    for(let i = 0; i < firstVal; i++) {
        inputTape = "1" + inputTape;
    }
    return inputTape;
}

const nextConfig = () => {
    turingMachine.nextConfig();
    displayInputTape();
};

const setCharAt = (str, index, chr) => {
    if(index > str.length-1) {
        return str;
    }
    return str.substr(0, index) + chr + str.substr(index+1);
};

let turingMachine = new TuringMachine(inputTapeInit, null)
displayInputTape();
