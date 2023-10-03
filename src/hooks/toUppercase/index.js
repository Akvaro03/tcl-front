const toUppercase = (string) => {
    string = string.trim();
    const palabras = string.split(" ");

    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }
    return palabras.join(" ");
}

export default toUppercase;