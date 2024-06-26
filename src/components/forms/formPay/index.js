import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import inputClass from "../../../classes/inputClass";
import FormPrototype from "../../formPrototype";
import { Box, Button, Checkbox } from "@mui/material";
import useCreateFactura from "../../../hooks/useCreateFactura";

function FormPay({ close, pay, addNotification, anotherSave }) {
    const { factura, handleChange, createFactura, getFactura } = useCreateFactura(pay, addNotification)
    const handleSubmit = () => {

        anotherSave ? anotherSave(getFactura()) : createFactura()
        close && setTimeout(() => {
            close()
        }, 200);
    }

    const inputPay = new inputClass(handleSubmit)
    return (
        <FormPrototype close={close} tittle={pay ? "Editar Factura" : "Agregar Factura"} >
            <Box display={"flex"} flexDirection={"column"} gap={"20px"} marginTop={"30px"} marginBottom={"30px"} alignItems={"center"}>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box marginRight={"20px"}>ID:</Box>
                    <Box width={"100%"}>
                        {inputPay.getInput(factura.id, (data) => handleChange(data, "id"))}
                    </Box>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Creación:</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                            value={factura.dateCreated} onChange={(date) => handleChange(date, "dateCreated")} />
                    </LocalizationProvider>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Vencimiento:</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                            value={factura.dateExpiration} onChange={(date) => handleChange(date, "dateExpiration")} />
                    </LocalizationProvider>
                </Box>
                <Box width={"80%"} display={"flex"} alignItems={"center"}>
                    <Box sx={{ width: "50%" }}>Cobro:</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            disabled={!factura.isPay}
                            slotProps={{ textField: { size: 'small' } }}
                            value={factura.datePay} onChange={(date) => handleChange(date, "datePay")} />
                    </LocalizationProvider>
                    <Checkbox
                        checked={factura.isPay}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
            </Box>

            <Box height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                <Button size="large" onClick={() => handleSubmit()} variant="contained" >Guardar</Button>
            </Box>
        </FormPrototype>
    );
}

export default FormPay;