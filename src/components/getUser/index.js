const CryptoJS = require("crypto-js");

function getUser() {
    const user = localStorage.getItem("user")
    const key = "consultar";
    const decrypted = CryptoJS.AES.decrypt(user, key);
    return decrypted
}

export default getUser;