import editDb from "../../classes/editDb";

export default function editUser(dataToSend) {
    return editDb.postData("editUser", dataToSend)
}
