import editDb from "../../classes/editDb";

export default function editOt(dataToSend, id, tittle = "", comment = "") {
    editDb.comment(id, tittle, comment)
    editDb.postData("editOt", dataToSend)
}

