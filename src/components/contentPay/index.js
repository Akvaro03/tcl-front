import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../modelPortal";
import FormPrototype from "../formPrototype";
import ListPays from "../list/listPays";

export default function ContentPay({ close, createFactura, addFactura, listPay = [] }) {
    const [select, setSelect] = useState(false)
    const navigate = useNavigate();
    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={close} tittle={"Agregar Factura"}>
                <Box sx={{ height: "15vmin", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Box height={"60%"} display={"flex"} width={"100%"} gap={"50px"} alignItems={"center"} justifyContent={"center"}>
                        <Button size="large" variant="outlined" onClick={setSelect}>Seleccionar</Button>
                        <Button size="large" variant="outlined" onClick={() => navigate("/createFact")}>Crear Nueva</Button>
                    </Box>
                    {select && (
                        <ListPays select={true} saveList={addFactura} listPay={listPay ? listPay : []} close={close} />
                    )}
                </Box>
            </FormPrototype>
        </ModalPortal>
    );
} 