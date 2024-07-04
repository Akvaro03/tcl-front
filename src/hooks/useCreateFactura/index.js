import dayjs from "dayjs"
import { useState } from "react"
import classToastList from "../../classes/classToastList"
import addPay from "../../db/addPay"

function useCreateFactura(prevFactura, addNotification) {
    const [factura, setFactura] = useState(prevFactura ? prevFactura : facturaDefault)

    const handleChange = (value, type) => {
        setFactura({ ...factura, [type]: value })
    }

    const getFactura = () => {
        return {
            dateExpiration: new Date(factura.dateExpiration).getTime(),
            dateCreated: new Date(factura.dateCreated).getTime(),
            datePay: factura.datePay ? new Date(factura.datePay).getTime() : null,
            id: String(factura.id)
        }
    }

    const createFactura = async () => {
        const facturaFormatted = getFactura()
        if (facturaFormatted.id === "") return classToastList.addToast(addNotification, "missed data")
        const response = await addPay({ pay: facturaFormatted })
        if (response === "name used") return classToastList.addToast(addNotification, "name used")
        classToastList.addToast(addNotification, "ok Fact")
        restart()
    }
    const restart = () => {
        setFactura(facturaDefault)
    }
    return { factura, handleChange, createFactura, getFactura }
}
const facturaDefault = {
    dateExpiration: dayjs(Date.now()),
    dateCreated: dayjs(Date.now()),
    datePay: null,
    isPay: false,
    id: ""
}
export default useCreateFactura;