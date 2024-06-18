import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import formatDate from "../../../../hooks/formatDate";
import { useState } from "react";
import dayjs from "dayjs";
import ModalPortal from "../../../../components/modelPortal";
import FormPrototype from "../../../../components/formPrototype";
function AddAvailability({ addAvailability, isDeletable, saveAvailability }) {
    const [date, setDate] = useState(dayjs(Date.now()))
    const types = ["DFR", "Retiro", "Entrega"]
    const [type, setType] = useState(types[0])
    const handleChange = (event) => {
        setType(event.target.value);
    };
    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={() => addAvailability(false)} tittle={"Selecciona Disposición"}>
                <Box sx={{ height: "35vmin", alignItems:"center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
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
                                {isDeletable && (
                                    <Box component={"div"} onClick={() => saveAvailability(null)}>
                                        <DeleteForeverIcon fontSize="large" sx={{ cursor: "pointer" }} />
                                    </Box>
                                )}
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
                        <Button size="large" variant="contained" onClick={() => saveAvailability({ type, date: formatDate(date) })}>Guardar</Button>
                    </Box>
                </Box>
            </FormPrototype>
        </ModalPortal>
    );
}

export default AddAvailability;