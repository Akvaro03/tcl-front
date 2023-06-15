import getUser from "../../hooks/getUser";
import postData from "../../hooks/postData";
import addChange from "../addChange";

function changeActOt(dataToSend, id, tittle = "", comment = "") {
    postData("http://localhost:4000/editOtActivities", dataToSend)
    const userLogin = getUser();
    const date = new Date().getTime();
    const change = {
        ChangeDescription: tittle,
        comment,
        date,
        userId: userLogin.id,
        userName: userLogin.name
    }

    addChange(change, id)
}

export default changeActOt;