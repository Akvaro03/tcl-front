import { useEffect, useState } from "react";
import getIp from "../getIp";

/**
 * Obtener datos de una url
 * @param {string} url 
 * @returns Objet
 */
function useFetchUrl(url) {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [reloadData, setReloadData] = useState(false)
    const rechargeData = () => {
        setReloadData(prev => !prev)
    }
    useEffect(() => {
        fetch(`${getIp()}:4000${url}`)
            .then(data => data.json())
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
    }, [url, reloadData])

    return { data, isLoading, rechargeData };
}

export default useFetchUrl;