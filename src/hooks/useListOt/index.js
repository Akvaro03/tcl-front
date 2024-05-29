import { useEffect, useState } from "react";
import useFetchUrl from "../useFetchUrl";

function useListOt() {
    const [ot, setOt] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allClients, setAllClients] = useState([])
    const allStates = ["Sin Autorizar", "Sin Asignar", "En Espera", "En Proceso", "Terminadas"]
    const { data, isLoading } = useFetchUrl("/getOT")

    const reloadOT = () => {
        setOt(data)
    }
    const filterTypeClient = (value) => {
        console.log(value)
    }
    const filterState = (value) => {
        console.log(value)
    }

    useEffect(() => {
        setOt(data)
        setAllTypes(data ? removeDuplicates(data.map(data => data.Type)) : [])
        setAllClients(data ? removeDuplicates(data.map(data => data.Client)) : [])
    }, [data])

    return { ot, allTypes, allClients, allStates, isLoading, reloadOT, filterTypeClient, filterState}
}

const removeDuplicates = (data) => {
    return data.filter((value, index) => data.indexOf(value) === index)
}

export default useListOt;