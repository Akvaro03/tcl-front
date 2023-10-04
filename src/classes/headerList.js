export default class headerList {
    constructor() {
        this.headers = []
    }

    addHeader(name, width) {
        this.headers.push({ name, width })
    }
    getHeader() {
        return this.headers;
    }
}