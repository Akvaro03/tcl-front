import { Box, Button } from "@mui/material";
import isUserAssigned from "../../../hooks/isUserAssigned";
import isActivitiesEnd from "../../../hooks/isActivitiesEnd";
import getStateActivity from "../../../hooks/getStateActivity";
import formatDateM from "../../../hooks/formatDateM";
import changeAuth from "../../../db/changeAuth";
import messageHistory from "../../../hooks/messageHistory";
import PriorityOt from "../../priorityOt";
import ClassPriorityOt from "../../../classes/priorityOt";
import editOt from "../../../db/editOT";
import getUser from "../../../hooks/getUser";
import permissions from "../../../classes/permissions";
import getStateOt from "../../../utilities/getStateOt";
export default function TableOT({ data, Colum, dataHover, recharge }) {
    const rol = getUser("roles");
    const stateOt = getStateOt(data)
    const handleChangeAuth = (data) => {
        const newAuth = data.Auth === "1" ? 0 : 1;
        const dataToSend = { otId: data.id, newAuth };
        data.Auth = newAuth;
        changeAuth(dataToSend, data.id,messageHistory.tittleEditaAuth, "") 
        recharge(data)
    }
    const handlePriority = () => {
        const newPriority = ClassPriorityOt.handleClick(data.priority)
        data.priority = newPriority;
        editOt(data, data.id, messageHistory.tittleEditPriority)
        recharge(data)
    }
    return (
        <>
            <Colum data={
                <Box component={"span"} onClick={() => handlePriority()}>
                    {<PriorityOt priority={data.priority} size="small" />}
                </Box>
            } width="3%" />
            <Colum data={data.OTKey} width="15%" />
            <Colum data={formatDateM(data.Date)} width="9%" />
            <Colum data={data.Type} width="13%" />
            <Colum data={data.Client} width="15%" />
            <Colum data={data.Producto} width="22%" />
            {stateOt === "Sin Autorizar" ? (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b8c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Sin Autorizar</h1>
                </Box>
            ) : stateOt === "Sin Asignar" ? (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ff80008c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Sin Asignar</h1>
                </Box>
            ) : stateOt === "Terminadas" ? (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#92ff6c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Terminada</h1>
                </Box>
            ) : stateOt === "En Proceso" ? (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>En Proceso</h1>
                </Box>
            ) : stateOt === "En Espera" && (
                <Box sx={{ borderRadius: "20px", margin: "5px", background: "#00000029", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>En espera</h1>
                </Box>
            )}
            {data.Auth === "0" && permissions.editAuth(rol) ? (
                dataHover === data.id ? (
                    <Box sx={{ opacity: "1", width: "15%", justifyContent: "center", visibility: "visible", transition: "visibility 0s, opacity 0.1s linear, width 0.15s linear" }}>
                        <Button onClick={() => handleChangeAuth(data)}>Autorizar OT</Button>
                    </Box>
                ) : (
                    <Box sx={{ opacity: "0", width: "5%", justifyContent: "center", visibility: "hidden", transition: "visibility 0s, opacity 0.1s linear, width 0.1s linear" }}>
                        <Button onClick={() => handleChangeAuth(data)}>Autorizar OT</Button>
                    </Box>
                )
            ) : (
                <Colum width="5%" />
            )}
        </>
    )
}
