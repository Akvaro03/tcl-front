import editDb from "../../classes/editDb";

export default function getOTFact(id) {
    return editDb.postData("getOTFact", {id})
}