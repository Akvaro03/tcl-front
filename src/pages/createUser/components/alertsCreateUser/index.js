import { Alert } from "@mui/material";
import Style from "./alertsCreateUser.module.css";
import { useState } from "react";

function AlertsCreateUser({ Result }) {
    const [className, setClassName] = useState()
    const { result } = Result
    setTimeout(() => {
        setClassName(Style.AlertStyle)
    }, 3000);
    return (
        <div className={className}>
            {result === "ok" ? (
                <Alert severity={"success"} >Se creo el usuario</Alert>
            ) : result === "missed data" ?(
                <Alert severity={"error"} >Complete todos los campos</Alert>
                ) : (
                <Alert severity={"error"} >Ha ocurrido un error</Alert>
            )}
        </div>
    )
    // if(Result === "ok"){
    // return <Alert severity={"success"} className={Style.AlertStyle}>Se inicio Sesion</Alert>
    // }
}

export default AlertsCreateUser;