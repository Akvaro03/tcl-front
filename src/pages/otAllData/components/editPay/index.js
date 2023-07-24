import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Fade } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

export default function EditPay({ pay, pays, deleteModal, savePay }) {
    const [datePaid, setDatePaid] = useState(dayjs(Date.now()))
    const deletePay = () => {
        const newList = pays.map(listPay => listPay.id).filter(listPayId => listPayId !== pay.id)
        savePay({ newList, delete: pay.id })
    }
    return (
        <Fade in={true}>
            <Box sx={{ width: "40%", height: "50%", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-evenly", height: "25%" }}>
                    <h1>
                    </h1>
                    <h1>
                        Editar Factura
                    </h1>
                    <Box component={"div"} onClick={() => deletePay()}>
                        <DeleteForeverIcon fontSize="large" sx={{ cursor: "pointer" }} />
                    </Box>
                </Box>
                <Box display={"flex"} height={"50%"} width={"90%"} flexDirection={"column"} gap={"25px"} justifyContent={"center"} alignItems={"center"}>
                    <Box width={"80%"} display={"flex"} alignItems={"center"}>
                        <Box sx={{ width: "50%" }}>ID</Box>
                        <h1>{pay.id}</h1>
                    </Box>
                    <Box width={"80%"} display={"flex"} alignItems={"center"}>
                        <Box sx={{ width: "50%" }}>Fecha de Paga</Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(data) => setDatePaid(data)}
                                value={datePaid}
                                slotProps={{ textField: { size: 'small' } }}
                            />
                        </LocalizationProvider>

                    </Box>
                </Box>

                <Box height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                    <Button size="small" variant="outlined" onClick={() => deleteModal(null)}>Cerrar</Button>
                    <Button size="large" variant="contained">Guardar</Button>
                </Box>
            </Box>
        </Fade>
    );
}