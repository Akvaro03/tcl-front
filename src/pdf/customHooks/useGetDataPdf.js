import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import postData from "../../db/postData";
import getIp from "../../hooks/getIp";

function useGetDataPdf() {
    const { id } = useParams();
    const [ot, setOt] = useState()
    const [client, setClient] = useState()
    const [contact, setContact] = useState()
    const [document, setDocument] = useState()
    const [location, setLocation] = useState()
    const [description, setDescription] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ot = await postData(`${getIp()}:4000/getOneOt`, { id }).then(response => response[0])
                const client = await postData(`${getIp()}:4000/getOneClient`, { Name: ot.Client }).then(Client => Client[0])
                setOt(ot)
                setClient(client)
                setLocation(client.location)
                setDescription(JSON.parse(ot.Description))
                ot.Contact && setContact(JSON.parse(ot.Contact))
                setDocument(JSON.parse(client.Document))
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [id])

    return { ot, client, contact, document, location, description };
}


export default useGetDataPdf;