import editDb from "../../classes/editDb";

export default function addClient(data) {
    return editDb.postData("postClients", data)
}