import editDb from "../../classes/editDb";
import editPay from "../editPay";
import addPay from "../addPay";
export default async function changePay(dataToSend, id, tittle = "", comment = "") {
    if (dataToSend.paid) {
        await editPay(dataToSend)
        return
    }
    if (!dataToSend.pay.delete) {
        const result = await addPay(dataToSend)
        if (result) {
            return result
        }
    }
    editDb.comment(id, tittle, comment)
    editDb.postData("editOtPay", dataToSend)
}
