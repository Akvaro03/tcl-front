import Style from "./alerts.module.css"
import { Alert, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import classToastList from "../../classes/classToastList";
function Alerts({ text: { text } }) {
    
    const [className, setClassName] = useState(Style.AlertStyleDefault)
    const [isVisible, setIsVisible] = useState(true)
    const states = {
        "abbr max": <AlertCustomError text={"Abreviación solo puede tener un caracter"} />,
        "error password": <AlertCustomError text={"Error en la contraseña"} />,
        "missed data": <AlertCustomError text={"Completa todos los campos"} />,
        "name used": <AlertCustomError text={"Ese nombre ya esta en uso"} />,
        "id used": <AlertCustomError text={"Ese id ya esta en uso"} />,
        "error": <AlertCustomError text={"Hubo un error desconocido"} />,
        "error email": <AlertCustomError text={"Error en el email"} />,

        "ok Config": <AlertCustomSucces text={"Se guardo la configuración"} />,
        "ok history": <AlertCustomSucces text={"Se guardaron los cambios"} />,
        "ok loadedImage": <AlertCustomSucces text={"Se cargo la imagen"} />,
        "ok Activity": <AlertCustomSucces text={"Se creó la actividad"} />,
        "ok client": <AlertCustomSucces text={"Se creó el Cliente"} />,
        "ok Fact": <AlertCustomSucces text={"Se creó la factura"} />,
        "ok user": <AlertCustomSucces text={"Se creó el usuario"} />,
        "ok sesion": <AlertCustomSucces text={"Se inicio Sesion"} />,
        "ok Type": <AlertCustomSucces text={"Se creó el tipo"} />,
        "ok ot": <AlertCustomSucces text={"Se guardo la OT"} />,
        "ok edit": <AlertCustomSucces text={"Se edito"} />,
        "ok": <AlertCustomSucces text={"Se guardo"} />,
    }
    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false)
        }, classToastList.timeRemove - 500);
    }, [])

    return (
        <Fade in={isVisible}>
            <div className={className}>
                {states[text.text]}
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