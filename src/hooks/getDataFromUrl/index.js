import getIp from "../getIp";

/**
 * Obtener datos de una url
 * @param {string} url 
 * @returns Objet
 */
function getDataFromUrl(url) {
    getIp()
    let data = fetch(`${getIp()}:4000${url}`)
        .then(data => data.json())
    return data;
}

export default getDataFromUrl;