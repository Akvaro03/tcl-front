import editDb from "../../classes/editDb";
import nameUsed from "../nameUsed";

export default async function addClient(data) {
    const isCodeUsed = await nameUsed(data.Key, "codeClient")
    const isNameUsed = await nameUsed(data.nameClient, "client")
    if (isNameUsed || isCodeUsed) {
        return "name used"
    }
    return editDb.postData("postClients", data).then(response => response.result)
}