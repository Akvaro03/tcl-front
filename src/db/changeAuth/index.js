import postData from "../../hooks/postData";
import addChange from "../../db/addChange";
import getUser from "../../hooks/getUser";

function changeAuth(OT) {
    const userLogin = getUser();
    const date = new Date().getTime();
    const change = {
        ChangeDescription: OT.Auth === "0" ? "Se autorizo la OT" : "Se desautorizo la OT",
        comment: "",
        date,
        userId: userLogin.id,
        userName: userLogin.name
    }
    postData("http://localhost:4000/editOtAuth", { otId: OT.id, newAuth: OT.Auth === "1" ? 0 : 1 })
    addChange(change, OT.id)
}

export default changeAuth;