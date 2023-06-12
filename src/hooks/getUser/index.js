const CryptoJS = require("crypto-js");

function getUser() {
    const user = localStorage.getItem("user")
    const key = 'consultar';
    const descript = CryptoJS.AES.decrypt(user, key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(JSON.parse(descript).userString)
}

export default getUser;