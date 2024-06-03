import { useEffect, useState } from "react"
import useFetchUrl from "../useFetchUrl"

function useListFactura(ot) {
    const [facturas, setFacturas] = useState([])
    const [filterValueFactura, setFilterValue] = useState("")
    const allFactura = ["OT Sin Facturar", "Pendientes", "Vencidas", "Cobradas"]
    const { data, isLoading: isLoadingFactura } = useFetchUrl("/getpay")

    const filterFactura = ({ target }) => {
        setFilterValue(target.value)
    }
    const reloadFactura = () => {
        setFacturas(data)
        setFilterValue("")
    }

    useEffect(() => {
        data && setFacturas(prev => prev.map(fact => { return { ...fact, OTFact: getOTFact(ot, fact.id) } }))
    }, [ot])


    useEffect(() => {
        setFacturas(data)
    }, [data])

    return { facturas, isLoadingFactura, allFactura, filterValueFactura, filterFactura, reloadFactura }
}

const getOTFact = (otList, id) => {
    const result = otList.filter(ot => {
        if (ot.Factura) {
            return JSON.parse(ot.Factura).includes(id)
        }
        return false
    }).map(data => data.OTKey)
    return result;
}

export default useListFactura;