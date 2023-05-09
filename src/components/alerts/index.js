import Style from "./alerts.module.css"
import { Alert } from "@mui/material";
import { useState } from "react";
function Alerts({ Result }) {
    const [className, setClassName] = useState()
    setTimeout(() => {
        setClassName(Style.AlertStyle)
    }, 3000);
    const states = {
        "error password": <Alert severity={"error"} >Error en la contraseña</Alert>,
        "error email": <Alert severity={"error"} >Error en el email</Alert>,
        "missed data": <Alert severity={"error"} >Completa todos los campos</Alert>,
        "ok sesion": <Alert severity={"success"} >Se inicio Sesion</Alert>,
        "ok history": <Alert severity={"success"} >Se guardaron los cambios</Alert>,
        "ok ot": <Alert severity={"success"} >Se guardo el OT</Alert>,
        "ok user": <Alert severity={"success"} >Se creo el usuario</Alert>,
    }
    return (
        <div className={className}>
            {states[Result]}
        </div>
    );
}

export default Alerts;