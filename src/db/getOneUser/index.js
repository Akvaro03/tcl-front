import editDb from "../../classes/editDb";

export default function getOneUser(dataToSend) {
    return editDb.postData("getOneUser", dataToSend)
}