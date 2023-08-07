const CryptoJS = require("crypto-js");

function getUser(data) {
    try {
        const user = localStorage.getItem("user")
        const key = 'consultar';
        const descript = CryptoJS.AES.decrypt(user, key).toString(CryptoJS.enc.Utf8);
        if (data === "roles") {
            return JSON.parse(JSON.parse(JSON.parse(descript).userString).type)[0]
        }
        return JSON.parse(JSON.parse(descript).userString)
    } catch (error) {
        return null
    }
}

export default getUser;