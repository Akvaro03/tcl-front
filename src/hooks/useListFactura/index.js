import { useEffect, useMemo, useState } from "react"
import useFetchUrl from "../useFetchUrl"
import editPay from "../../db/editPay"

function useListFactura(ot) {
    const [facturas, setFacturas] = useState([])
    const [filterValueFactura, setFilterValue] = useState("")
    const allFactura = useMemo(() => ["Pendientes", "Vencidas", "Cobradas"], [])

    const [facturasFormated, setFacturasFormated] = useState()

    const [isFormated, setIsFormated] = useState(false)
    const [isEditFactura, setIsEditFactura] = useState(null)

    const { data, isLoading: isLoadingFactura, rechargeData } = useFetchUrl("/getpay")

    const filterFactura = ({ target }) => {
        setFilterValue(target.value)
    }
    const reloadFactura = () => {
        setFacturas(formateFacturas(data, ot))
        setFacturasFormated(formateFacturas(data, ot))
        setFilterValue("")
    }
    const handleIsEditFactura = (data) => {
        setIsEditFactura(data)
    }
    const saveFactura = (pay) => {
        editPay({ ...pay, prevId: isEditFactura.id })
        rechargeData()
    }
    useEffect(() => {
        const valueFilter = allFactura[filterValueFactura]
        const thisDay = new Date().getTime()
        if (valueFilter === "Pendientes") {
            setFacturas(facturasFormated.filter(factura => {
                if (thisDay < new Date(factura.dateExpiration).getTime() && !factura.datePay) {
                    return true
                }
                return false
            }))
        }
        if (valueFilter === "Vencidas") {
            setFacturas(facturasFormated.filter(factura => {
                if (thisDay > new Date(factura.dateExpiration).getTime() && !factura.datePay) {
                    return true
                }
                return false
            }))
        }
        if (valueFilter === "Cobradas") {
            setFacturas(facturasFormated.filter(factura => factura.datePay))
        }
    }, [filterValueFactura, allFactura, facturasFormated])

    useEffect(() => {
        if (data && ot) {
            setFacturas(formateFacturas(data, ot))
            setFacturasFormated(formateFacturas(data, ot))
            setIsFormated(true)
        }
    }, [ot, data])

    return { facturas, isFormated, allFactura, filterValueFactura, isEditFactura, isLoadingFactura, saveFactura, handleIsEditFactura, filterFactura, reloadFactura }
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

const formateFacturas = (facturas, ot) => facturas.map(fact => { return { ...fact, OTFact: getOTFact(ot, fact.id) } })

export default useListFactura;