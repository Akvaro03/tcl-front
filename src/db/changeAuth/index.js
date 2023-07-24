import editDb from "../../classes/editDb";

function changeAuth(dataToSend, id, tittle = "", comment = "") {
    editDb.comment(id, tittle, comment)
    editDb.postData("editOtAuth", dataToSend)
}

export default changeAuth;