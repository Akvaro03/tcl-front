import getIp from "../getIp";

/**
 * Obtener datos de una url
 * @param {string} url 
 * @returns Objet
 */
function fetchAsyncUrl(url) {
    return new Promise((resolve, reject) => {
        try {
            fetch(`${getIp()}:4000${url}`)
                .then(data => data.json())
                .then(data => resolve(data))

        } catch (error) {
            reject(error)
        }
    })
}

export default fetchAsyncUrl;