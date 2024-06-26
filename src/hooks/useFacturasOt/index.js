import { useState } from "react"
import { default as EditPay } from "../../db/editPay"
import { default as AddPay } from "../../db/addPay"

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
        console.log(editFactura)
    }
    const payFactura = (payFactura, dayPaid) => {
        const dateFormated = new Date(dayPaid).getTime()
        console.log("pagar factura")
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
    const createFactura = (newFactura) => {
        console.log(newFactura)
        // AddPay({ pay: newFactura })
        // facturas && setTimeout(() => {
        //     addFactura(newFactura.id)
        // }, 500);
    }
    return { addPay, editPay, createFactura, handleUi, payFactura, editFactura, addFactura, deleteFactura }
}

export default useFacturaOT;