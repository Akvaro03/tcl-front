import Style from "./alerts.module.css"
import { Alert } from "@mui/material";
import { useState } from "react";
function Alerts({ Result }) {
    const [className, setClassName] = useState(Style.AlertStyleDefault)
    setTimeout(() => {
        setClassName(Style.AlertStyleMove)
    }, 3000);
    const states = {
        "error password": <AlertCustomError text={"Error en la contraseña"} />,
        "missed data": <AlertCustomError text={"Completa todos los campos"} />,
        "name used": <AlertCustomError text={"Ese nombre ya esta en uso"} />,
        "error email": <AlertCustomError text={"Error en el email"} />,
        "abbr max": <AlertCustomError text={"Abreviación solo puede tener un caracter"} />,

        "ok Config": <AlertCustomSucces text={"Se guardo la configuración"} />,
        "ok history": <AlertCustomSucces text={"Se guardaron los cambios"} />,
        "ok loadedImage": <AlertCustomSucces text={"Se cargo la imagen"} />,
        "ok Activity": <AlertCustomSucces text={"Se creó la actividad"} />,
        "ok client": <AlertCustomSucces text={"Se creó el Cliente"} />,
        "ok user": <AlertCustomSucces text={"Se creó el usuario"} />,
        "ok sesion": <AlertCustomSucces text={"Se inicio Sesion"} />,
        "ok Type": <AlertCustomSucces text={"Se creó el tipo"} />,
        "ok ot": <AlertCustomSucces text={"Se guardo la OT"} />,
        "ok edit": <AlertCustomSucces text={"Se edito"} />,
    }
    return (
        <div className={className}>
            {states[Result]}
        </div>
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