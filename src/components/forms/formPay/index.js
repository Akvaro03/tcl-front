import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import inputClass from "../../../classes/inputClass";
import FormPrototype from "../../formPrototype";
import { Box, Button, Checkbox } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import typePay from "../../../types/typePay";

function FormPay({ close, save, pay = [], missedData }) {
    const [dateExpiration, setDateExpiration] = useState(pay ? dayjs(pay.dateExpiration) : dayjs(Date.now()))
    const [dateCreated, setDateCreated] = useState(pay ? dayjs(pay.dateCreated) : dayjs(Date.now()))
    const [datePay, setDatePay] = useState(pay && dayjs(pay.datePay))
    const [isPay, SetIsPay] = useState(pay.datePay ? true : false)
    const [id, setId] = useState(pay ? pay.id : undefined)

    const handleSubmit = () => {
        const newPay = new typePay({ id, dateCreated, dateExpiration, datePay })

        if (!newPay.verifyPay()) {
            missedData()
            return
        }

        const copyPay = pay.id ? [{ ...pay }] : [...pay]
        copyPay.push(id)
        save({ id: String(id), dateCreated, dateExpiration, datePay, newList: copyPay.map(data => data.id ? data.id : data) })
        close && setTimeout(() => {
            close()
        }, 200);
    }

    const handleChange = (event) => {
        SetIsPay(event.target.checked);
        if (!event.target.checked) {
            setDatePay(null)
        } else {
            setDatePay(pay.id ? dayjs(pay.datePay) : null)
        }
    };

    const inputPay = new inputClass(handleSubmit)
    return (
        <FormPrototype close={close} tittle={pay.id ? "Editar Factura" : "Agregar Factura"} >
            <Box display={"flex"} flexDirection={"column"} gap={"20px"} marginTop={"30px"} marginBottom={"30px"} alignItems={"center"}>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box marginRight={"20px"}>ID:</Box>
                    <Box width={"100%"}>
                        {inputPay.getInput(id, (data) => setId(data))}
                    </Box>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Creación:</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                            value={dateCreated} onChange={(date) => setDateCreated(date)} />
                    </LocalizationProvider>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Vencimiento:</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                            value={dateExpiration} onChange={(date) => setDateExpiration(date)} />
                    </LocalizationProvider>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Cobro:</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            disabled={!isPay}
                            slotProps={{ textField: { size: 'small' } }}
                            value={datePay} onChange={(date) => setDatePay(date)} />
                    </LocalizationProvider>
                    <Checkbox
                        checked={isPay}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
            </Box>

            <Box height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                {close && (
                    <Button size="small" onClick={() => close(false)} variant="outlined"  >Cerrar</Button>
                )}
                <Button size="large" onClick={() => handleSubmit()} variant="contained" >Guardar</Button>
            </Box>
        </FormPrototype>
    );
}

export default FormPay;