import editDb from "../../classes/editDb";

function addChange(newChange, idOt) {
    return editDb.postData("editOtChanges", { Changes: newChange, idOt })
}

export default addChange;