import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Typography } from "@mui/material";
import inputClass from "../../../classes/inputClass";
import { useEffect, useRef, useState } from "react";
import { closeEsc } from "../../../hooks/closeEsc";
import dayjs from "dayjs";

function FormPay({ close, save, pay = [] }) {
    const divRef = useRef(null);
    const [dateExpiration, setDateExpiration] = useState(dayjs(Date.now()))
    const [dateCreated, setDateCreated] = useState(dayjs(Date.now()))
    const [id, setId] = useState("")
    useEffect(() => {

        const divElement = divRef.current;
        if (divElement) {
            divElement.addEventListener('keydown', e => closeEsc(e, close));
        }
        return () => {
            divElement.removeEventListener('keydown', closeEsc);
        };
    }, [close])

    const handleSubmit = () => {
        const copyPay = [...pay]
        copyPay.push(id)
        save({ id: String(id), dateCreated, dateExpiration, newList: copyPay.map(data => data.id ? data.id : data) })
    }
    const inputPay = new inputClass(handleSubmit)
    return (
        <Box ref={divRef} tabIndex={0} sx={{ width: "600px", height: "50%", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "25%" }}>
                <Typography component={"h1"} sx={{ fontSize: "19px" }}>
                    Agregar Factura
                </Typography>
            </Box>
            <Box display={"flex"} height={"50%"} width={"70%"} flexDirection={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"}>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "48%" }}>ID</Box>
                    <Box sx={{ width: "30%" }}>
                        {inputPay.getInput(id, (data) => setId(data))}
                    </Box>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Creación</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                            value={dateCreated} onChange={(date) => setDateCreated(date)} />
                    </LocalizationProvider>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Vencimiento</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                            value={dateExpiration} onChange={(date) => setDateExpiration(date)} />
                    </LocalizationProvider>
                </Box>
            </Box>

            <Box height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                {close && (
                    <Button size="small" onClick={() => close(false)} variant="outlined"  >Cerrar</Button>
                )}
                <Button size="large" onClick={() => handleSubmit()} variant="contained" >Guardar</Button>
            </Box>
        </Box>
    );
}

export default FormPay;