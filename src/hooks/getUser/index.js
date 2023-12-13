const CryptoJS = require("crypto-js");

function getUser(data) {
    try {
        const dataSave = localStorage.getItem("user")
        const key = 'consultar';
        const descript = CryptoJS.AES.decrypt(dataSave, key).toString(CryptoJS.enc.Utf8);
        const user = JSON.parse(JSON.parse(descript).userString)

        if (data === "roles") {
            return JSON.parse(user.type)[0]
        }
        return user;
    } catch (error) {
        return null
    }
}

export default getUser;