import editDb from "../../classes/editDb"

export default function changeItems(dataToSend, id, tittle = "", comment = "") {
    editDb.comment(id, tittle, comment)
    editDb.postData("editOtDescription", dataToSend)
}
