import editDb from "../../classes/editDb";

export default function getOneFact(id) {
    return editDb.getData("getOneFact", {id})
}