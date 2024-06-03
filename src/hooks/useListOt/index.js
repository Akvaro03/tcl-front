import { useEffect, useState } from "react";
import useFetchUrl from "../useFetchUrl";
import getStateOt from "../../utilities/getStateOt";

function useListOt() {
    const [ot, setOt] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [allClients, setAllClients] = useState([])
    const allProduct = ["Sin Disposicion", "Retiro", "Entrega", "DFR"]
    const allStates = ["Sin Autorizar", "Sin Asignar", "En Espera", "En Proceso", "Terminadas"]
    const { data, isLoading } = useFetchUrl("/getOT")
    const [filterValues, setFilterValues] = useState(initialFilterValues)

    const reloadOT = () => {
        setOt(data)
        setFilterValues(initialFilterValues)
    }
    const filterType = ({ target }) => {
        setFilterValues(prev => ({ ...prev, Type: target.value, product: initialFilterValues.product, factura: initialFilterValues.factura }))
    }
    const filterClient = ({ target }) => {
        setFilterValues(prev => ({ ...prev, Client: target.value, product: initialFilterValues.product, factura: initialFilterValues.factura }))
    }
    const filterState = ({ target }) => {
        setFilterValues(prev => ({ ...prev, state: target.value, product: initialFilterValues.product, factura: initialFilterValues.factura }))
    }


    const filterProduct = ({ target }) => {
        setFilterValues(({ ...initialFilterValues, product: target.value }))
    }
    useEffect(() => {
        let filtered = data

        if (filterValues.product !== "") {
            if (filterValues.product === 0) {
                filtered = filtered.filter(ot => !ot.Availability);
            } else {
                filtered = filtered.filter(ot => JSON.parse(ot.Availability)?.type === allProduct[filterValues.product]);
            }
            setOt(filtered)
            return
        }


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

    return { ot, allTypes, allClients, allStates, isLoading, filterValues, allProduct, reloadOT, filterType, filterState, filterClient, filterProduct }
}

const initialFilterValues = { Type: "", Client: "", state: "", product: "", factura: "" }
const removeDuplicates = (data) => {
    return data.filter((value, index) => data.indexOf(value) === index)
}

export default useListOt;