import { Box, Button, Fade } from "@mui/material";
import { useState } from "react";
import ModalPortal from "../../../../components/modelPortal";
import EditPay from "../editPay";
import ProtectedAction from "../../../../components/protectedAction";

export default function OptionPay({ reload, pay, pays, deleteModal, savePay }) {
    const [editPay, setEditPay] = useState()
    const [confirmDelete, setConfirmDelete] = useState()
    const deletePay = () => {
        const newList = pays.map(listPay => listPay.id).filter(listPayId => listPayId !== pay.id)
        savePay({ newList, delete: pay.id })
    }

    return (
        <>
            <Fade in={true}>
                <Box sx={{ width: "500px", height: "200px", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    <Box height={"95%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                        <Button size="medium" sx={{ width: "150px", height: "50px" }} variant="outlined" onClick={setConfirmDelete}>Desvincular</Button>
                        <Button size="medium" sx={{ width: "150px", height: "50px" }} variant="contained" onClick={setEditPay}>Cobrar</Button>
                    </Box>
                    <Box component={"div"} display={"flex"} justifyContent={"flex-end"} width={"80%"} >
                        <Button size="large" onClick={() => deleteModal(null)}>Cancelar</Button>
                    </Box>
                </Box>
            </Fade>
            {editPay && (
                <ModalPortal type={"form"}>
                    <EditPay pay={pay} pays={pays} deleteModal={deleteModal} savePay={savePay} />
                </ModalPortal>
            )}
            {confirmDelete && (
                <ModalPortal type={"form"}>
                    <ProtectedAction text={"Estas seguro de desvincular esta factura de esta OT?"} textButton={"Desvincular"} action={deletePay} close={deleteModal} />
                </ModalPortal>
            )}
        </>
    );
}