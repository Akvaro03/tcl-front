import toUppercase from "../../hooks/toUppercase";
import typeMaster from "../typeMaster";

export default class TypeClient extends typeMaster {
    constructor(nameClient, Document, location, key, ContactVerificate, idEditable) {
        super();
        this.nameClient = toUppercase(nameClient);
        this.ContactVerificate = ContactVerificate;
        this.Document = Document;
        this.location = location;
        this.Key = key;
        this.idEditable = idEditable;
    }
    verificate() {
        return (
            this.nameClient !== undefined && this.nameClient.length > 0 &&
            this.location !== undefined && this.location.length > 0 &&
            this.Key !== undefined && this.Key.length > 0 &&
            this.idEditable !== undefined &&
            this.Document !== undefined
        );
    }
}