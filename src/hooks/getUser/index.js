const CryptoJS = require("crypto-js");

function getUser(data) {
    const user = localStorage.getItem("user")
    const key = 'consultar';
    const descript = CryptoJS.AES.decrypt(user, key).toString(CryptoJS.enc.Utf8);
    if (data === "roles") {
        return JSON.parse(JSON.parse(JSON.parse(descript).userString).type)
    }
    return JSON.parse(JSON.parse(descript).userString)
}

export default getUser;