import editDb from "../../classes/editDb";

export default function addOt(data) {
    return editDb.postData("postOT", data)
}