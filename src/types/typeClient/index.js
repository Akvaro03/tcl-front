import toUppercase from "../../hooks/toUppercase";
import typeMaster from "../typeMaster";

export default class TypeClient extends typeMaster {
    constructor(nameClient, Document, location, key, ContactVerificate) {
        super();
        this.nameClient = toUppercase(nameClient);
        this.ContactVerificate = ContactVerificate;
        this.Document = Document;
        this.location = location;
        this.Key = key;
    }
    verificate() {
        return (
            this.nameClient !== undefined && this.nameClient.length > 0 &&
            this.location !== undefined && this.location.length > 0 &&
            this.Key !== undefined && this.Key.length > 0 &&
            this.Document !== undefined
        );
    }
}