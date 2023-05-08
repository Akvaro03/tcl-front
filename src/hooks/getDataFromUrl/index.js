/**
 * Obtener datos de una url
 * @param {string} url 
 * @returns Objet
 */
function getDataFromUrl(url) {
    let data = fetch(url)
        .then(data => data.json())
    return data;
}

export default getDataFromUrl;