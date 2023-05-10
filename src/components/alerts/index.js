import Style from "./alerts.module.css"
import { Alert } from "@mui/material";
import { useState } from "react";
function Alerts({ Result }) {
    const [className, setClassName] = useState(Style.AlertStyleDefault)
    setTimeout(() => {
        setClassName(Style.AlertStyleMove)
    }, 3000);
    const states = {
        "error password":   <Alert sx={{justifyContent: "space-evenly"}} severity={"error"} >Error en la contraseña</Alert>,
        "error email":      <Alert sx={{justifyContent: "space-evenly"}} severity={"error"} >Error en el email</Alert>,
        "missed data":      <Alert sx={{justifyContent: "space-evenly"}} severity={"error"} >Completa todos los campos</Alert>,
        "ok sesion":        <Alert sx={{justifyContent: "space-evenly"}} severity={"success"} >Se inicio Sesion</Alert>,
        "ok history":       <Alert sx={{justifyContent: "space-evenly"}} severity={"success"} >Se guardaron los cambios</Alert>,
        "ok ot":            <Alert sx={{justifyContent: "space-evenly"}} severity={"success"} >Se guardo el OT</Alert>,
        "ok user":          <Alert sx={{justifyContent: "space-evenly"}} severity={"success"} >Se creo el usuario</Alert>,
        "ok client":        <Alert sx={{justifyContent: "space-evenly"}} severity={"success"} >Se creo el Cliente</Alert>,
    }
    return (
        <div className={className}>
            {states[Result]}
        </div>
    );
}

export default Alerts;