import editDb from "../../classes/editDb";

export default function editActivity(dataToSend) {
    return editDb.postData("editActivity", dataToSend)
}
