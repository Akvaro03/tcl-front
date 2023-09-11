import editDb from "../../classes/editDb";

export default function deleteActivity(dataToSend) {
    return editDb.postData("deleteActivity", dataToSend)
}