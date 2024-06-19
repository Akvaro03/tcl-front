import { useState } from "react"

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
    const handleUi = (type, data) => {
        if (type === "add") {
            setAddPay(data)
            return
        }
        setEditPay(data)
    }
    return { addPay, editPay, handleUi, editFactura, addFactura, deleteFactura }
}

export default useFacturaOT;