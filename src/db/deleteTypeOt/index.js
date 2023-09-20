import editDb from "../../classes/editDb";

export default function deleteTypeOt(data) {
    return editDb.postData("deleteTypeOt", data).then(data => data.result)
} 