export default class typePay {
    constructor({ id, dateCreated, dateExpiration, datePay }) {
        this.dateExpiration = new Date(dateExpiration).getTime();
        this.dateCreated = new Date(dateCreated).getTime();
        this.datePay = new Date(datePay).getTime();
        this.id = String(id);
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