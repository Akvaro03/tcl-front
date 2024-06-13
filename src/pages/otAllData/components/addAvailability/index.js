import { Box, Button, Fade, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import formatDate from "../../../../hooks/formatDate";
import { useState } from "react";
import dayjs from "dayjs";
import ModalPortal from "../../../../components/modelPortal";
function AddAvailability({ addAvailability, isDeletable, saveAvailability }) {
    const [date, setDate] = useState(dayjs(Date.now()))
    const types = ["DFR", "Retiro", "Entrega"]
    const [type, setType] = useState(types[0])
    const handleChange = (event) => {
        setType(event.target.value);
    };
    return (
        <ModalPortal type={"form"}>
            <Fade in={true}>
                <Box sx={{ width: "40%", height: "40%", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-around", height: "25%" }}>
                        <h1>
                        </h1>
                        <h1>
                            Selecciona Disposición
                        </h1>
                        {isDeletable ? (
                            <Box component={"div"} onClick={() => saveAvailability(null)}>
                                <DeleteForeverIcon fontSize="large" sx={{ cursor: "pointer" }} />
                            </Box>
                        ) : (
                            <h1>
                            </h1>
                        )}
                    </Box>
                    <Box display={"flex"} height={"40%"} width={"90%"} flexWrap={"wrap"} justifyContent={"center"}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={type}
                                onChange={handleChange}>
                                {types && types.map((activity, key) => (
                                    <FormControlLabel key={key} value={activity} control={<Radio />} label={activity} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: 'small' } }}
                                value={date} onChange={(date) => setDate(date)} />
                        </LocalizationProvider>
                    </Box>

                    <Box height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                        <Button size="small" variant="outlined" onClick={() => addAvailability(false)}>Cerrar</Button>
                        <Button size="large" variant="contained" onClick={() => saveAvailability({ type, date: formatDate(date) })}>Guardar</Button>
                    </Box>
                </Box>
            </Fade>
        </ModalPortal>
    );
}

export default AddAvailability;