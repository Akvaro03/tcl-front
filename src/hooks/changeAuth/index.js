import addChange from "../../hooks/addChange";
import getUser from "../getUser";
import postData from "../../hooks/postData";

function changeAuth(OT) {
    const userLogin = getUser();
    const date = new Date().getTime();
    const change = {
        ChangeDescription: "Se autorizo la OT",
        comment: "",
        date,
        userId: userLogin.id,
        userName: userLogin.name
    }
    postData("http://localhost:4000/editOtAuth", { otId: OT.id, newAuth: OT.Auth === "1" ? 0 : 1 })
    addChange(change, OT.id)
}

export default changeAuth;