import { Box, Button } from "@mui/material";
import { useState } from "react";
import FormPay from "../../../../components/forms/formPay";
import ModalPortal from "../../../../components/modelPortal";
import ListPays from "../../../../components/list/listPays";

export default function ContentPay({ close, save, pay = [], saveList, listPay }) {
    const [create, setCreate] = useState(false)
    const [select, setSelect] = useState(false)
    return (
        <Box sx={{ width: "40%", height: "30%", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-evenly", height: "25%", alignItems: "flex-end" }}>
                <h1>
                    Editar Factura
                </h1>
            </Box>
            <Box height={"60%"} display={"flex"} width={"100%"} gap={"50px"} alignItems={"center"} justifyContent={"center"}>
                <Button size="large" variant="outlined" onClick={setSelect}>Seleccionar</Button>
                <Button size="large" variant="outlined" onClick={setCreate}>Crear nueva</Button>
            </Box>
            {create && (
                <ModalPortal type={"form"}>
                    <FormPay close={close} save={save} pay={pay} />
                </ModalPortal>
            )}
            {select && (
                <ModalPortal type={"form"}>
                    <ListPays select={true} saveList={saveList} listPay={listPay} close={close}/>
                </ModalPortal>
            )}
        </Box>
    );
} 