import editDb from "../../classes/editDb";
import nameUsed from "../nameUsed";

export default async function editTypeOt(data) {
    
    if (await isUsed(data.abbr, "abbreviation") || await isUsed(data.nameType, "typeOT")) {
        return "name used"
    }
    return editDb.postData("editTypeOt", data).then(data => data.result)
}

const isUsed = async (data, name) => {
    if (data) {
        return nameUsed(data, name)
    }
    return false;
}