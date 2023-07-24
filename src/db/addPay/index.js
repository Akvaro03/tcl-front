import editDb from "../../classes/editDb";

export default function addPay(dataToSend) {
    editDb.postData("postPay", dataToSend)
}
