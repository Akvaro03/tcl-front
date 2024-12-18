import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import formatDateM from "../../../hooks/formatDateM";
import changeAuth from "../../../db/changeAuth";
import messageHistory from "../../../hooks/messageHistory";
import PriorityOt from "../../priorityOt";
import ClassPriorityOt from "../../../classes/priorityOt";
import editOt from "../../../db/editOT";
import getUser from "../../../hooks/getUser";
import permissions from "../../../classes/permissions";
import getStateOt from "../../../utilities/getStateOt";
import delete_ot from "../../../db/delete_ot";
import { useState } from "react";

export default function TableOT({ data, Colum, dataHover, recharge }) {
    const rol = getUser("roles");
    const stateOt = getStateOt(data);
    const [open, setOpen] = useState(false);

    const handleChangeAuth = (data, newAuth) => {
        const dataToSend = { otId: data.id, newAuth };
        data.Auth = newAuth;
        changeAuth(dataToSend, data.id, messageHistory.tittleEditaAuth, "");
        recharge(data);
    };

    const handleDelete = () => {
        delete_ot({ id: data.id })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting OT:", error);
            });
        handleDialog()
    };

    const handlePriority = () => {
        if (!permissions.editPriority(rol)) return
        const newPriority = ClassPriorityOt.handleClick(data.priority);
        data.priority = newPriority;
        editOt(data, data.id, messageHistory.tittleEditPriority);
        recharge(data);
    };

    const handleDialog = () => {
        setOpen(!open);
    };

    const toggleAnulado = () => {
        const newAuth = data.Auth === "-1" ? "0" : "-1";
        handleChangeAuth(data, newAuth);
        handleDialog()
    };

    const isDirector = rol === "Director";

    return (
        <>
            <Colum data={
                <Box component={"div"} onClick={() => handlePriority()}>
                    {<PriorityOt priority={data.priority} size="small" />}
                </Box>
            } width="3%" />

            <Colum data={
                <Box component={"div"} onClick={handleDialog}>
                    <IconButton sx={{ padding: "0px" }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            } width="3%" />

            <Dialog
                open={open}
                onClose={handleDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmar eliminación"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro de que desea eliminar este OT?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ color: "black", padding: "0", borderRadius: "5px", margin: "1px", display: "flex", justifyContent: "space-between" }}>
                    <Button sx={{ color: "black", margin: "5px", padding: "10px", background: "#9BC9DD" }} onClick={handleDialog}>Cancelar</Button>
                    {isDirector && (
                        <Button sx={{ color: "black", margin: "5px", padding: "10px", background: "#9BC9DD" }} onClick={handleDelete} autoFocus>
                            Eliminar
                        </Button>
                    )}
                    <Button sx={{ color: "black", margin: "5px", padding: "10px", background: "#9BC9DD" }} onClick={toggleAnulado} color="secondary">
                        {data.Auth === "-1" ? "Revertir Anulación" : "Anular OT"}
                    </Button>
                </DialogActions>

            </Dialog>

            <Colum data={data.OTKey} width="15%" />
            <Colum data={formatDateM(data.Date)} width="9%" />
            <Colum data={data.Type} width="13%" />
            <Colum data={data.Client} width="15%" />
            <Colum data={data.Producto} width="22%" />
            {stateOt === "Sin Autorizar" ? (
                <Box component={"div"} sx={{ borderRadius: "20px", margin: "5px", background: "#ff7b7b8c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Sin Autorizar</h1>
                </Box>
            ) : stateOt === "Sin Asignar" ? (
                <Box component={"div"} sx={{ borderRadius: "20px", margin: "5px", background: "#ff80008c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Sin Asignar</h1>
                </Box>
            ) : stateOt === "Terminadas" ? (
                <Box component={"div"} sx={{ borderRadius: "20px", margin: "5px", background: "#92ff6c", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Terminada</h1>
                </Box>
            ) : stateOt === "En Proceso" ? (
                <Box component={"div"} sx={{ borderRadius: "20px", margin: "5px", background: "#ffff0052", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>En Proceso</h1>
                </Box>
            ) : stateOt === "En Espera" ? (
                <Box component={"div"} sx={{ borderRadius: "20px", margin: "5px", background: "#00000029", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>En espera</h1>
                </Box>
            ) : (
                <Box component={"div"} sx={{ borderRadius: "20px", margin: "5px", background: "#ff0000", width: "16%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Anulado</h1>
                </Box>
            )}
            {data.Auth === "0" && permissions.editAuth(rol) ? (
                dataHover === data.id ? (
                    <Box component={"div"} sx={{ opacity: "1", width: "15%", justifyContent: "center", visibility: "visible", transition: "visibility 0s, opacity 0.1s linear, width 0.15s linear" }}>
                        <Button onClick={() => handleChangeAuth(data, 1)}>Autorizar OT</Button>
                    </Box>
                ) : (
                    <Box component={"div"} sx={{ opacity: "0", width: "5%", justifyContent: "center", visibility: "hidden", transition: "visibility 0s, opacity 0.1s linear, width 0.1s linear" }}>
                        <Button onClick={() => handleChangeAuth(data, 1)}>Autorizar OT</Button>
                    </Box>
                )
            ) : (
                <Colum width="5%" />
            )}
        </>
    );
}