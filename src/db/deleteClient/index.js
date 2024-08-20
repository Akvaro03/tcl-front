import editDb from "../../classes/editDb";

export default function deleteClientDb(dataToSend) {
    return editDb.postData("deleteClient", dataToSend)
}