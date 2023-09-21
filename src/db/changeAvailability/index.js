import editDb from "../../classes/editDb"

export default function changeAvailability(dataToSend, id, tittle = "", comment = "") {
    console.log(dataToSend)
    editDb.comment(id, tittle, comment)
    editDb.postData("editOtAvailability", dataToSend[0])
}
