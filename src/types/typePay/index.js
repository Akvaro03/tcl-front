export default class typePay {
    constructor({ id, dateCreated, dateExpiration, datePay }) {
        this.dateExpiration = dateExpiration;
        this.dateCreated = dateCreated;
        this.datePay = datePay;
        this.id = id;
    }
    verifyPay() {
        return (
            this.id && this.id.length > 0 &&
            this.dateCreated !== undefined &&
            this.dateExpiration !== undefined &&
            this.datePay !== undefined
        );
    }
} 