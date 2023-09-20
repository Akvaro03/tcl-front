import editDb from "../../classes/editDb";

export default function addActivity(data) {
    return editDb.postData("postActivity", data)
}