import editDb from "../../classes/editDb";

function changeActOt(dataToSend, id, tittle = "", comment = "") {
    editDb.comment(id, tittle, comment)
    editDb.postData("editOtActivities", dataToSend)
}

export default changeActOt; 