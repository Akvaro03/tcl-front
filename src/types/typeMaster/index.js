export default class typeMaster {
    verificateAllData() {
        this.propertiesToCheck = Object.keys(this);
        return this.propertiesToCheck.every(prop => this[prop] !== undefined && this[prop].length > 0);
    }
    verificate(properties) {
        return properties.every(prop => this[prop] !== undefined && this[prop].length > 0);
    }
}