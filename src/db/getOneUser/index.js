import editDb from "../../classes/editDb";

export default function getOneUser(dataToSend) {
    return editDb.getData("getOneUser", dataToSend)
}