import editDb from "../../classes/editDb";

export default function login(data) {
    return editDb.postData("login", data)
}