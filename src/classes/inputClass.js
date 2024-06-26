import InputMui from "../components/inputMui";

export default class inputClass {
    constructor(submitFunction) {
        this.submitFunction = submitFunction;
    }

    getInput(value, onchange) {
        return <InputMui value={value} onChange={onchange} sendData={this.submitFunction} />
    }
} 