import editDb from "../../classes/editDb";
import nameUsed from "../nameUsed";

export default async function addType(dataToSend) {
    const isNameUsed = await nameUsed(dataToSend.nameType, "typeOT")
    const isAbbreviationUsed = await nameUsed(dataToSend.abbr, "abbreviation")
    if (isNameUsed || isAbbreviationUsed) {
        return "name used"
    }
    return editDb.postData("postTypeOt", dataToSend).then(({ result }) => result)
}
