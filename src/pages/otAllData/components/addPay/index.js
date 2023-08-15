import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputMui from "../../../../components/inputMui";
import { Box, Button, Fade } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

function AddPay({ close, save, pay = [] }) {
    const [dateExpiration, setDateExpiration] = useState(dayjs(Date.now()))
    const [dateCreated, setDateCreated] = useState(dayjs(Date.now()))
    const [id, setId] = useState("")
    const handleSubmit = () => {
        const copyPay = [...pay]
        copyPay.push(id)
        save({ id: String(id), dateCreated, dateExpiration, newList: copyPay.map(data => data.id ? data.id : data) })
    }
    return (
        <Fade in={true}>
            <Box sx={{ width: "60%", height: "50%", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "25%" }}>
                    <h1>
                        Agregar Facturas
                    </h1>
                </Box>
                <Box display={"flex"} height={"50%"} width={"90%"} flexDirection={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"}>
                    <Box width={"80%"} display={"flex"} alignItems={"center"}>
                        <Box sx={{ width: "50%" }}>ID</Box>
                        <InputMui value={id} onChange={data => setId(data)} />
                    </Box>
                    <Box width={"80%"} display={"flex"} alignItems={"center"}>
                        <Box sx={{ width: "50%" }}>Fecha de creación</Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: 'small' } }}
                                value={dateCreated} onChange={(date) => setDateCreated(date)} />
                        </LocalizationProvider>
                    </Box>
                    <Box width={"80%"} display={"flex"} alignItems={"center"}>
                        <Box sx={{ width: "50%" }}>Fecha de Expiración</Box>
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
        </Fade>
    );
}

export default AddPay;