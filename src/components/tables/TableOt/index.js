import { Box, Button } from "@mui/material";
import isUserAssigned from "../../../hooks/isUserAssigned";
import isActivitiesEnd from "../../../hooks/isActivitiesEnd";
import getStateActivity from "../../../hooks/getStateActivity";
import { Navigate } from "react-router-dom";
import formatDateM from "../../../hooks/formatDateM";
import changeAuth from "../../../db/changeAuth";
import messageHistory from "../../../hooks/messageHistory";

export default function TableOT({ OT, Colum, otHover, recharge }) {
    const handleChangeAuth = (OT) => {
        const newAuth = OT.Auth === "1" ? 0 : 1;
        const dataToSend = { otId: OT.id, newAuth };
        changeAuth(dataToSend, OT.id,
            messageHistory.tittleEditaAuth, "")
        recharge(OT)
    }

    return (
        <>
            <Colum data={OT.OTKey} width="15%" />
            <Colum data={formatDateM(OT.Date)} width="9%" />
            <Colum data={OT.Type} width="13%" />
            <Colum data={OT.Client} width="15%" />
            <Colum data={OT.Producto} width="22%" />
            {OT.Auth === "0" ? (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b8c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Sin Autorizar</h1>
                </Box>
            ) : !isUserAssigned(OT) ? (
                <Box component="div" onClick={() => Navigate(`/events/${OT.id}`)} sx={{ borderRadius: "20px", margin: "5px", background: "#ff80008c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Sin Asignar</h1>
                </Box>
            ) : isActivitiesEnd(OT.Activities) ? (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#92ff6c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Terminada</h1>
                </Box>
            ) : getStateActivity(OT) === "En proceso" ? (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>En Proceso</h1>
                </Box>
            ) : (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#00000029", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>En espera</h1>
                </Box>
            )}
            {OT.Auth === "0" ? (
                otHover === OT.id ? (
                    <Box sx={{ opacity: "1", width: "15%", justifyContent: "center", visibility: "visible", transition: "visibility 0s, opacity 0.1s linear, width 0.15s linear" }}>
                        <Button onClick={() => handleChangeAuth(OT)}>Autorizar OT</Button>
                    </Box>
                ) : (
                    <Box sx={{ opacity: "0", width: "5%", justifyContent: "center", visibility: "hidden", transition: "visibility 0s, opacity 0.1s linear, width 0.1s linear" }}>
                        <Button onClick={() => handleChangeAuth(OT)}>Autorizar OT</Button>
                    </Box>
                )
            ) : (
                <Colum width="5%" />
            )}
        </>
    )
}
