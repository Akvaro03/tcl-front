import editDb from "../../classes/editDb";
import idEditableUsed from "../idEditableUsed";
import nameUsed from "../nameUsed";

export default async function editClient(data, sameCode, sameName, sameIdEditable) {
    const isCodeUsed = sameCode ? false : await nameUsed(data.Key, "codeClient")
    const isNameUsed = sameName ? false : await nameUsed(data.nameClient, "client")
    const isIdEditableUsed = sameIdEditable ? false : await idEditableUsed(data.idEditable)
    if (isNameUsed || isCodeUsed) {
        return "name used"
    }
    if (isIdEditableUsed) {
        return "id used"
    }
    return editDb.postData("editClient", data)
}