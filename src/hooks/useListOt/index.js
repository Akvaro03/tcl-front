import { useEffect, useState } from "react";
import useFetchUrl from "../useFetchUrl";
import getStateOt from "../../utilities/getStateOt";

function useListOt() {
    const [ot, setOt] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allClients, setAllClients] = useState([])
    const allStates = ["Sin Autorizar", "Sin Asignar", "En Espera", "En Proceso", "Terminadas"]
    const { data, isLoading } = useFetchUrl("/getOT")
    const [filterValues, setFilterValues] = useState({ Type: "", Client: "", state: "" })

    const reloadOT = () => {
        setOt(data)
        setFilterValues({ Type: "", Client: "", state: "" })
    }
    const filterType = ({ target }) => {
        setFilterValues(prev => ({ ...prev, Type: target.value }))
    }
    const filterClient = ({ target }) => {
        setFilterValues(prev => ({ ...prev, Client: target.value }))
    }
    const filterState = ({ target }) => {
        setFilterValues(prev => ({ ...prev, state: target.value }))
    }
    useEffect(() => {
        let filtered = data
        if (filterValues.Type !== "") {
            filtered = filtered.filter(ot => ot.Type === allTypes[filterValues.Type]);
        }

        if (filterValues.Client !== "") {
            filtered = filtered.filter(ot => ot.Client === allClients[filterValues.Client]);
        }
        if (filterValues.state !== "") {
            filtered = filtered.filter(ot => getStateOt(ot) === allStates[filterValues.state]);
        }
        setOt(filtered)
    }, [filterValues])

    useEffect(() => {
        setOt(data?.reverse())
        setAllTypes(data ? removeDuplicates(data.map(data => data.Type)) : [])
        setAllClients(data ? removeDuplicates(data.map(data => data.Client)) : [])
    }, [data])

    return { ot, allTypes, allClients, allStates, isLoading, filterValues, reloadOT, filterType, filterState, filterClient }
}

const removeDuplicates = (data) => {
    return data.filter((value, index) => data.indexOf(value) === index)
}

export default useListOt;