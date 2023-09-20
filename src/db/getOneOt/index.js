import editDb from "../../classes/editDb";
export default function getOneOt(data) {
    return editDb.postData("getOneOt", data)
}