import InputMui from "../components/inputMui";

export default class inputClass {
    constructor(submitFunction) {
        this.submitFunction = submitFunction;
    }

    getInput(value, onchange, type) {
        return <InputMui type={type} value={value} onChange={onchange} sendData={this.submitFunction} />
    }
} 