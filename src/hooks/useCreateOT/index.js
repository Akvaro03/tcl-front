import dayjs from "dayjs"
import { useState } from "react"
import createNewDate from "../createNewDay"

const useCreateOT = (props) => {
    const [OT, setOT] = useState({ ...initialValue, props })
    const editOT = (category, value) => {
        setOT(prev => ({ ...prev, [category]: value }))
    }
    const getOt = () => {
        const OTClear = clearOt()
        return {
            ...OTClear,
            contractName: OTClear.contractSelect ? OTClear.contractSelect.label : OTClear.contractName,
            Description: OTClear.Description ? JSON.stringify(OTClear.Description) : OTClear.Description,
            Date: createNewDate(OTClear.Date),
            FechaEstimada: createNewDate(OTClear.FechaEstimada),
            FechaVencimiento: createNewDate(OTClear.FechaVencimiento)
        }
    }
    const clearOt = () => {
        const copyOT = { ...OT }
        for (let key in copyOT) {
            if (copyOT.hasOwnProperty(key)) {
                if (copyOT[key] === null || copyOT[key] === "" || (Array.isArray(copyOT[key]) && copyOT[key].length === 0)) {
                    delete copyOT[key];
                }
            }
        }
        return copyOT
    }
    const verifyOT = () => {
        const ot = getOt()
        const allProperty = Object.getOwnPropertyNames(ot)
        return propertiesVerify.every(data =>
            allProperty.includes(data)
        )
    }


    return { OT, editOT, getOt, verifyOT }
}

const initialValue = {
    "id": null,
    "priority": null,
    "OTKey": "",
    "Client": null,
    "Date": dayjs(),
    "Producto": "",
    "Marca": "",
    "Modelo": "",
    "NormaAplicar": "",
    "Cotizacion": "",
    "FechaVencimiento": dayjs(),
    "FechaEstimada": dayjs(),
    "Type": null,
    "Description": [{ item: "", Description: "", import: 0 }],
    "StateProcess": null,
    "Observations": "",
    "Contact": null,
    "Changes": null,
    "Auth": null,
    "Activities": null,
    "IdClient": null,
    "Availability": null,
    "Factura": null,
    "nLacre": "",
    "contractName": null
}

const propertiesVerify = [
    "Date",
    "Producto",
    "Marca",
    "Modelo",
    "NormaAplicar",
    "Cotizacion",
    "nLacre",
    "Observations",
    "Activities",
    "FechaEstimada",
    "FechaVencimiento",
]

export default useCreateOT;