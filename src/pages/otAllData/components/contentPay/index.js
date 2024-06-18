import FormPrototype from "../../../../components/formPrototype";
import ModalPortal from "../../../../components/modelPortal";
import ListPays from "../../../../components/list/listPays";
import FormPay from "../../../../components/forms/formPay";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function ContentPay({ close, save, saveList, listPay = [] }) {
    const [create, setCreate] = useState(false)
    const [select, setSelect] = useState(false)
    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={close} tittle={"Agregar Factura"}>
                <Box sx={{ height: "15vmin", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Box height={"60%"} display={"flex"} width={"100%"} gap={"50px"} alignItems={"center"} justifyContent={"center"}>
                        <Button size="large" variant="outlined" onClick={setSelect}>Seleccionar</Button>
                        <Button size="large" variant="outlined" onClick={setCreate}>Crear Nueva</Button>
                    </Box>
                    {create && (
                        <FormPay close={close} save={save} />
                    )}
                    {select && (
                        <ListPays select={true} saveList={saveList} listPay={listPay ? listPay : []} close={close} />
                    )}
                </Box>
            </FormPrototype>
        </ModalPortal>
    );
} 