import editDb from "../../classes/editDb";
import nameUsed from "../nameUsed";

export default async function editClient(data, sameCode, sameName) {
    const isCodeUsed = sameCode ? false : await nameUsed(data.Key, "codeClient")
    const isNameUsed = sameName ? false : await nameUsed(data.nameClient, "client")
    if (isNameUsed || isCodeUsed) {
        return "name used"
    }
    return editDb.postData("editClient", data).then(response => response.result)
}