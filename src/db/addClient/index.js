import editDb from "../../classes/editDb";
import idEditableUsed from "../idEditableUsed";
import nameUsed from "../nameUsed";

export default async function addClient(data) {
    const isCodeUsed = await nameUsed(data.KeyUnique, "codeClient")
    const isNameUsed = await nameUsed(data.Name, "client")
    const isIdEditableUsed = await idEditableUsed(data.idEditable)
    if (isNameUsed || isCodeUsed) {
        return "name used"
    }
    if (isIdEditableUsed) {
        return "id used"
    } 
    return editDb.postData("postClients", data)
}