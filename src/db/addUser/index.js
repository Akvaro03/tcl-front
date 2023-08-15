import editDb from "../../classes/editDb";

export default function addUser(dataToSend) {
    return editDb.postData("postUsers", dataToSend)
}
