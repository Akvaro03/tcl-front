import { Box, Button } from "@mui/material";
import { useState } from "react";
import ModalPortal from "../../../../components/modelPortal";
import EditPay from "../editPay";
import FormPrototype from "../../../../components/formPrototype";

export default function OptionPay({ pay, close, deletePay }) {
    const [editPay, setEditPay] = useState()

    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={close} tittle={"Seleccione actividades"}>
                <Box sx={{ padding: "5vmin", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Box height={"95%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                        <Button size="medium" sx={{ width: "150px", height: "50px" }} variant="outlined" onClick={() => deletePay(pay)}>Desvincular</Button>
                        <Button size="medium" sx={{ width: "150px", height: "50px" }} variant="contained" onClick={setEditPay}>Cobrar</Button>
                    </Box>
                </Box>
                {editPay && (
                    <ModalPortal type={"form"}>
                        <EditPay pay={pay} deleteModal={close} />
                    </ModalPortal>
                )}
            </FormPrototype>
        </ModalPortal>
    );
}