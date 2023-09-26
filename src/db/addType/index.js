import editDb from "../../classes/editDb";
import nameUsed from "../nameUsed";

export default async function addType(dataToSend) {
    const isNameUsed = await nameUsed(dataToSend.nameType, "typeOT")

    if (dataToSend.abbr[1]) {
        return "abbr max"
    }
    if (isNameUsed) {
        return "name used"
    }
    return editDb.postData("postTypeOt", dataToSend).then(({ result }) => result)
}
