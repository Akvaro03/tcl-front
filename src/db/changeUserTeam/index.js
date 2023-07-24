import editDb from "../../classes/editDb"

export default function changeUserTeam(dataToSend) {
    editDb.postData("editUserTeam", dataToSend)
}