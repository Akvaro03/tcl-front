import editDb from "../../classes/editDb";

export default function changePay(dataToSend, id, tittle = "", comment = "") {
    editDb.comment(id,tittle,comment)
    editDb.postData("editOtPay", dataToSend)
    if (!dataToSend.pay.delete) {
        editDb.postData("postPay", dataToSend)
    }
}
