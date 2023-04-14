import { Alert } from "@mui/material";
function Alerts({ Result, hash, Email }) {

    if (hash && Email) {
        if (Result === "ok") {
            return <Alert severity={"success"} >Se inicio Sesion</Alert>
        } else if (Result === "error password") {
            return <Alert severity={"error"} >Error en la contraseña</Alert>
        } else if (Result === "error email") {
            return <Alert severity={"error"} >Error en el email</Alert>
        }
    } else {
        if (Result === "ok") {
            return <Alert severity={"success"} >Se guardo el OT</Alert>
        }
    }
}

export default Alerts;