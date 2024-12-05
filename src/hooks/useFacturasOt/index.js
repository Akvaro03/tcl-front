import { useState } from "react"
import { default as EditPay } from "../../db/editPay"

function useFacturaOT(facturas, saveChanges) {
    const [addPay, setAddPay] = useState()
    const [editPay, setEditPay] = useState()
    const addFactura = (newFactura) => {
        saveChanges([...facturas, newFactura])
    }

    const deleteFactura = (facturaDelete) => {
        saveChanges(facturas.filter(factura => factura !== facturaDelete))
        handleUi("edit", false)
    }
    const editFactura = (editFactura) => {
    }
    const payFactura = (payFactura, dayPaid) => {
        const dateFormated = new Date(dayPaid).getTime()
        EditPay({ datePay: dateFormated, id: payFactura })
        handleUi("edit", false)
    }
    const handleUi = (type, data) => {
        if (type === "add") {
            setAddPay(data)
            return
        }
        setEditPay(data)
    }
    return { addPay, editPay, handleUi, payFactura, editFactura, addFactura, deleteFactura }
}

export default useFacturaOT;