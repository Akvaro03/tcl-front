import dayjs from "dayjs"
import { useState } from "react"

const useCreateOT = () => {
    const [OT, setOT] = useState(initialValue)
    const editOT = (category, value) => {
        setOT(prev => ({ ...prev, [category]: value }))
    }

    const getOt = () => {
        return OT
    }

    return { OT, editOT, getOt }
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

export default useCreateOT;