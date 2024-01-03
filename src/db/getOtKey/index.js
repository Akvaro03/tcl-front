import editDb from "../../classes/editDb";
export default function getOtKey(date) {
    return editDb.getData("getOtKey", {date})
}