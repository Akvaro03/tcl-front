const toUppercase = (string) => {
    // string = string.trim();
    // const palabras = string.split(" ");
    // palabras[0][0].toUppercase();
    // for (let i = 0; i < palabras.length; i++) {
    //     palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    // }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default toUppercase;