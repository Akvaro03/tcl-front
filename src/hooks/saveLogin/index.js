const CryptoJS = require("crypto-js");
function saveLogin(user) {
    let userString = JSON.stringify(user);
    const key = 'consultar';
    const encryptedCP = CryptoJS.AES.encrypt(JSON.stringify({ userString }), key).toString();

    localStorage.setItem("user", encryptedCP)
}

export default saveLogin;