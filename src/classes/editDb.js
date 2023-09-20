import addChange from "../db/addChange";
import postData from "../db/postData";
import getIp from "../hooks/getIp";
import getUser from "../hooks/getUser";
// import axios from "axios";

export default class editDb {
    static comment(id, tittle, comment) {
        try {
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
        } catch (error) {
            console.log(error)
        }
    }
    static postData(url, dataToSend) {
        try {
            // axios.get("https://api.ipify.org/?format=json").then(({ data }) => console.log(data.ip))
            return postData(`${getIp()}:4000/${url}`, dataToSend)
        } catch (error) {
            console.log(error)
        }
    }
}