import editDb from "../../classes/editDb";

export default function deleteUser(data) {
    return editDb.postData("deleteUser", data).then(data => data.result)
} 