import editDb from "../../classes/editDb";

export default function editPay(data) {
    editDb.postData("editPay", data)
} 