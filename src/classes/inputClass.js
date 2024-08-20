import InputMui from "../components/inputMui";

/**
 * @typedef {'text' | 'number' | 'email' | 'password' | 'date' | 'checkbox' | 'radio' | 'file' | 'hidden' | 'image' | 'url' | 'tel'} InputTypes
 */

export default class inputClass {
    /**
     * @param {function} submitFunction
     */
    constructor(submitFunction) {
        this.submitFunction = submitFunction;
    }

    /**
     * @param {string} value
     * @param {function} onchange
     * @param {InputTypes} type
     * @returns {JSX.Element}
     */
    getInput(value, onchange, type) {
        return <InputMui type={type} value={value} onChange={onchange} sendData={this.submitFunction} />
    }
}
