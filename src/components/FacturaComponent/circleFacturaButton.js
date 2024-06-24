import { useEffect, useState } from "react";
import getOneFact from "../../db/getOneFact";
import CircleButton from "../CircleButton";

function CircleFacturaButton({ data, onClick }) {
    const [factura, setFactura] = useState(null)

    useEffect(() => {
        getOneFact(data).then(data => setFactura(data))
    }, [data])
    const compareDate = (date) => {
        const today = new Date()
        const expirationDate = new Date(date.dateExpiration)
        if (today > expirationDate && !date.datePay) return "#ff7373"
        if (today < expirationDate) return "white"
        if (date.datePay) return "#a1ff75"
        
        if (!date) return "white"


        return "white"
    }
    if (factura) return (
        <CircleButton background={compareDate(factura)} onClick={onClick} tittle={factura.id} />
    )
}

export default CircleFacturaButton;