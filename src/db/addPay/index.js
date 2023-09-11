import editDb from "../../classes/editDb";
import nameUsed from "../nameUsed";

export default async function addPay(dataToSend) {
    const isNameUsed = await nameUsed(dataToSend.pay.id, "pays")
    if (isNameUsed) {
        return "name used"
    }
    editDb.postData("postPay", dataToSend)
}
