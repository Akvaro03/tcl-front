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
        "error email": <AlertCustomError text={"Error en el email"} />,
        "missed data": <AlertCustomError text={"Completa todos los campos"} />,
        "ok sesion": <AlertCustomSucces text={"Se inicio Sesion"} />,
        "ok history": <AlertCustomSucces text={"Se guardaron los cambios"} />,
        "ok ot": <AlertCustomSucces text={"Se guardo el OT"} />,
        "ok user": <AlertCustomSucces text={"Se creo el usuario"} />,
        "ok client": <AlertCustomSucces text={"Se creo el Cliente"} />,
        "ok Activity": <AlertCustomSucces text={"Se creo la actividad"} />,
        "ok Type": <AlertCustomSucces text={"Se creo el tipo"} />,
    }
    return (
        <div className={className}>
            {states[Result]}
        </div>
    );
}
const AlertCustomSucces = ({ text }) => {
    return (
        <Alert sx={{ justifyContent: "space-evenly" }} severity={"success"} >{text}</Alert>
    )
}
const AlertCustomError = ({ text }) => {
    return (
        <Alert sx={{ justifyContent: "space-evenly", opacity: 1 }} severity={"warning"} >{text}</Alert>
    )
}
export default Alerts;