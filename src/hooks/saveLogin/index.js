const CryptoJS = require("crypto-js");
function saveLogin(user) {
    // Dispatch(addUser(user))
    let userString = JSON.stringify(user); 
    const key = "consultar";
    const encrypted = CryptoJS.AES.encrypt(userString, key);
    localStorage.setItem("user",encrypted)
}

export default saveLogin;