import editDb from "../../classes/editDb"

export default function changeAvailability(dataToSend, id, tittle = "", comment = "") {
    editDb.comment(id, tittle, comment)
    editDb.postData("editOtAvailability", dataToSend)
}
