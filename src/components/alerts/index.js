import Style from "./alerts.module.css"
import { Alert, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import classToastList from "../../classes/classToastList";
function Alerts({ text: { text } }) {
    const [className] = useState(Style.AlertStyleDefault)
    const [isVisible, setIsVisible] = useState(true)
    const states = {
        "abbr max": <AlertCustomError text={"Abreviación solo puede tener un carácter"} />,
        "error password": <AlertCustomError text={"Error en la contraseña"} />,
        "missed data": <AlertCustomError text={"Completa todos los campos"} />,
        "name used": <AlertCustomError text={"Ese nombre ya está en uso"} />,
        "email used": <AlertCustomError text={"Ese email ya está en uso"} />,
        "id used": <AlertCustomError text={"Ese id ya está en uso"} />,
        "error": <AlertCustomError text={"Hubo un error desconocido"} />,
        "error email": <AlertCustomError text={"Error en el email"} />,

        "ok Config": <AlertCustomSucces text={"Se guardó la configuración"} />,
        "ok history": <AlertCustomSucces text={"Se guardaron los cambios"} />,
        "ok loadedImage": <AlertCustomSucces text={"Se cargó la imagen"} />,
        "ok Contract": <AlertCustomSucces text={"Se guardo el Contrato"} />,
        "ok Activity": <AlertCustomSucces text={"Se creó la actividad"} />,
        "ok client": <AlertCustomSucces text={"Se creó el Cliente"} />,
        "ok Fact": <AlertCustomSucces text={"Se creó la factura"} />,
        "ok user": <AlertCustomSucces text={"Se creó el usuario"} />,
        "ok sesion": <AlertCustomSucces text={"Se inició Sesión"} />,
        "ok Type": <AlertCustomSucces text={"Se creó el tipo"} />,
        "ok ot": <AlertCustomSucces text={"Se guardó la OT"} />,
        "ok edit": <AlertCustomSucces text={"Se editó"} />,
        "ok": <AlertCustomSucces text={"Se guardó"} />,

        "missed Type": <AlertCustomError text={"Completa el campo Tipo"} />,
        "missed Client": <AlertCustomError text={"Completa el campo Cliente"} />,
        "missed contractSelect": <AlertCustomError text={"Completa el campo Contrato"} />,
        "missed Cotizacion": <AlertCustomError text={"Completa el campo Cotización"} />,
        "missed Producto": <AlertCustomError text={"Completa el campo Producto"} />,
        "missed Marca": <AlertCustomError text={"Completa el campo Marca"} />,
        "missed Modelo": <AlertCustomError text={"Completa el campo Modelo"} />,
        "missed Observations": <AlertCustomError text={"Completa el campo Observaciones"} />,
        "missed Description": <AlertCustomError text={"Completa Item, Importe y Descripción"} />,
        "missed Contacts": <AlertCustomError text={"Completa todos los campos"} />,
        "missed Contact": <AlertCustomError text={"El cliente no tiene contactos asociados"} />,
        "keyUnique length": <AlertCustomError text={"El código tiene que ser de 3 o 4 letras"} />,
    }
    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false)
        }, classToastList.timeRemove - 500);
    }, [])

    return (
        <Fade in={isVisible}>
            <div className={className}>
                {states[text]}
            </div>
        </Fade>

    );
}
const AlertCustomSucces = ({ text }) => {
    return (
        <Alert variant="filled" sx={{ justifyContent: "space-evenly" }} severity={"success"} >{text}</Alert>
    )
}
const AlertCustomError = ({ text }) => {
    return (
        <Alert variant="filled" sx={{ justifyContent: "space-evenly" }} severity={"warning"} >{text}</Alert>
    )
}
export default Alerts;