import { useState } from "react";
import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";
import ContentPay from "../../pages/otAllData/components/contentPay";
import CircleButton from "../CircleButton";
import Style from "./FacturaComponent.module.css"

function FacturaComponent({ facturas, saveChanges }) {
    const [addPay, setAddPay] = useState()
    const rol = getUser("roles")
    const nose = (a) => console.log(a)
    if (!facturas && !permissions.editPay(rol)) return ""
    if (!facturas && permissions.editPay(rol)) return (
        <>
            <CircleButton onClick={setAddPay} tittle={"Agregar Factura"} />
            {addPay && (
                <ContentPay close={() => setAddPay(false)} save={saveChanges} pay={facturas} saveList={nose} listPay={facturas} />
            )}
        </>
    )
    return (
        <>
            {facturas.map((data, key) => (
                <CircleButton key={key} tittle={data} />
            ))}
            <CircleButton onClick={setAddPay} tittle={"Agregar Factura"} />
            {addPay && (
                <ContentPay close={() => setAddPay(false)} save={saveChanges} pay={facturas} saveList={nose} listPay={facturas} />
            )}
        </>
    );
}

export default FacturaComponent;