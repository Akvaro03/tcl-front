import editDb from "../../classes/editDb";

function changeStateActivityOT(dataToSend, id, tittle = "", comment = "") {
    editDb.comment(id, tittle, comment)
    editDb.postData("editStateActivityOT", dataToSend)
}

export default changeStateActivityOT; 