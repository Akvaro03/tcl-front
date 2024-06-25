import editDb from "../../classes/editDb";

export default function delete_ot(dataToSend) {
    return editDb.postData("delete_ot", dataToSend);
}