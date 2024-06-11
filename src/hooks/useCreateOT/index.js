import dayjs from "dayjs"
import { useState } from "react"
import createNewDate from "../createNewDay"
import getUser from "../getUser"

const useCreateOT = (props = null) => {
    const [OT, setOT] = useState({ ...initialValue, props })

    const editOT = (category, value) => {
        if (category === "Client") {
            editOT("Contact", initialValue.Contact)
        }
        setOT(prev => ({ ...prev, [category]: value }))
    }
    const getOt = () => {
        const OTClear = clearOt()
        const { id, name } = getUser()
        const Changes = [{
            userId: id,
            userName: name,
            ChangeDescription: `Se creó la OT`,
            date: new Date(OT.Date).getTime(),
            comment: ""
        }];
        return {
            ...OTClear,
            contractName: OTClear.contractSelect ? JSON.stringify(OTClear.contractSelect) : null,
            Description: OTClear.Description ? JSON.stringify(OTClear.Description) : OTClear.Description,
            Date: createNewDate(OTClear.Date),
            FechaEstimada: createNewDate(OTClear.FechaEstimada),
            FechaVencimiento: OTClear.FechaVencimiento ? createNewDate(OTClear.FechaVencimiento) : OTClear.FechaVencimiento,
            Contact: OTClear.Contact ? JSON.stringify(OTClear.Contact) : "[]",
            Client: OTClear.Client ? OTClear.Client.Name : "",
            IdClient: OTClear.Client ? OTClear.Client.idEditable : "",
            Identificación: OTClear.OTKey + " " + isNullUndefined(OTClear.Type) + " " + isNullUndefined(OTClear.Client?.KeyUnique),
            Changes: JSON.stringify(Changes),
            Type: OT.Type?.nameType
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
    const verifyOT = (propertiesVerify = initialPropertiesVerify) => {
        const ot = getOt();
        const allProperty = Object.getOwnPropertyNames(ot);
        for (const data of propertiesVerify) {
            if (!allProperty.includes(data)) {
                return data; // Retorna la propiedad que dio false
            }
        }
        return true; // Retorna true si todas las propiedades están presentes
    };
    const resetOt = () => {
        setOT({
            ...initialValue,
            Activities: OT.Activities,
            Type: OT.Type,
            contractSelect: OT.contractName
        })
    }
    return { OT, editOT, getOt, verifyOT, resetOt }
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
    "FechaVencimiento": null,
    "FechaEstimada": dayjs(),
    "Type": null,
    "Description": [{ item: "", Description: "", import: 0 }],
    "StateProcess": null,
    "Observations": "",
    "Changes": null,
    "Auth": null,
    "Activities": null,
    "IdClient": null,
    "Availability": null,
    "Factura": null,
    "nLacre": "",
    "contractName": null,
    "Contact": []
}
const isNullUndefined = (data) => (data === null | data === undefined ? "" : data)
const initialPropertiesVerify = [
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
]

export default useCreateOT;