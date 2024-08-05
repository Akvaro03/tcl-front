import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, Box, Button, InputBase, MenuItem, Select, TextField, styled } from "@mui/material";
import classToastList from '../../../../classes/classToastList';
import Style from "./formCreateOt.module.css"
import Input from '@mui/base/Input';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import useCreateOT from "../../../../hooks/useCreateOT";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useFetchUrl from "../../../../hooks/useFetchUrl";
import getOTkey from "../../../../hooks/getOTkey";
import { forwardRef, useEffect, useState } from "react";
import SelectContact from "../../../../components/selectContract";
import toUppercase from "../../../../hooks/toUppercase";
import ToastList from '../../../../components/toastList';
import addOt from '../../../../db/addOt';
import MultipleSelect from '../../../../components/multipleSelect';
import ModalPortal from '../../../../components/modelPortal';

import dayjs from 'dayjs';
import PrintOtModal from '../../../../components/PrintOtModal';

function FormCreateOt() {
    const [isSave, setIsSave] = useState(null)
    const [isSaveOTDisabled, setIsSaveOTDisabled] = useState(false)
    const [toasts, setToasts] = useState([])
    const { OT, editOT, getOt, verifyOT, resetOt } = useCreateOT()
    const { data: allTypes } = useFetchUrl('/getTypeOt')
    const { data: clientsData } = useFetchUrl('/getClients')
    const clientsFormate = clientsData ? clientsData.map(client => ({
        label: `${client.KeyUnique} - ${client.Name}`,
        idEditable: client.idEditable,
        id: client.id,
        KeyUnique: client.KeyUnique,
        Name: client.Name,
        Contacts: client.Contacts ? JSON.parse(client.Contacts) : ""
    })) : [];

    const submitUseOT = async () => {
        setIsSaveOTDisabled(true)
        const isVerify = verifyOT()

        if (isVerify !== true) {
            classToastList.addToast(setToasts, "missed data")
            setIsSaveOTDisabled(false)
            return
        }
        const resOt = await addOt(getOt())
        setIsSave(resOt)
        setIsSaveOTDisabled(false)
        resetOt()
    }
    const handleChangeDescription = (value, number, type) => {
        let copy = [...OT.Description]
        copy[number][type] = type === "Description" && value ? toUppercase(value) : value;
        editOT("Description", copy)
    };
    const handleType = (value) => {
        editOT("Activities", allTypes[value].activities)
        editOT("Type", allTypes[value])
    }
    return (
        <form className={Style.Form}>
            <div className={Style.idOT}>
                <label htmlFor="ot-id">ID:</label>
                <BootstrapInput value={OT.OTKey + " " + isNullUndefined(OT.Type?.abbreviation) + " " + isNullUndefined(OT.Client?.KeyUnique)} disabled id="ot-id" variant="outlined" />
            </div>
            <div className={Style.dateSection}>
                <label htmlFor="ot-date">Fecha:</label>
                <Box sx={{ paddingTop: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disableFuture
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                            value={OT.Date} onChange={(value) => editOT("Date", value)} />
                    </LocalizationProvider>
                </Box>
            </div>
            <div className={Style.SelectContainer}>
                <label htmlFor="ot-type">Tipo:</label>
                {allTypes && (
                    <Select sx={{ height: "45px", width: "100%" }}
                        fullWidth
                        onChange={({ target: { value } }) => handleType(value)}
                        placeholder='Selecciona el tipo de OT'
                        defaultValue={""}>
                        {allTypes.map((type, index) => (
                            <MenuItem key={index} value={index}>{type.nameType}</MenuItem >
                        ))}
                    </Select>
                )}
            </div>
            <div className={Style.SelectContainer}>
                <label htmlFor="ot-client">Cliente:</label>
                {clientsFormate && (
                    <Autocomplete
                        disablePortal
                        disableClearable
                        onChange={(event, newValue) => (editOT("Client", newValue))}
                        value={OT.Client}
                        id="ot-client"
                        isOptionEqualToValue={(options, value) => (options.Name === value.Name)}
                        options={clientsFormate}
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Cliente" />}
                    />
                )}
            </div>
            <div className={Style.SelectContainer}>
                <SelectContact setData={(e) => editOT("contractSelect", e)} />
            </div>
            <div className={Style.SelectContainer}>
                {OT.Client && OT.Client.Contacts[0] && (
                    <MultipleSelect
                        size={"medium"}
                        onchange={(value) => editOT("Contact", value.map(data => Number(data[0]) - 1))}
                        names={OT.Client.Contacts.map(((ContactClient, key) => (`${key + 1} ${ContactClient.type}: ${ContactClient.contact} ${ContactClient.email}`)))}
                        label={"Contactos seleccionados"} />
                )}
            </div>
            <div className={Style.dataOT}>
                <div className={Style.inputsContainer}>
                    <div className={Style.ClientData}>
                        <div className={Style.ClientDataContent}>
                            <p >Número de Cliente:</p>
                            <BootstrapInput style={{ width: "100%" }} value={isNullUndefined(OT.Client?.idEditable)} disabled id="client-number" variant="outlined" />
                        </div>
                        <div className={Style.ClientDataContent}>
                            <p >Clave Única del Cliente:</p>
                            <BootstrapInput style={{ width: "100%" }} value={isNullUndefined(OT.Client?.KeyUnique)} disabled id="client-key" variant="outlined" />
                        </div>
                    </div>
                    <div className={Style.DataInput}>
                        <CustomInput value={OT.Producto} onChange={(e) => editOT("Producto", e)} placeholder={"Producto"} />
                    </div>
                    <div className={Style.DataInput}>
                        <CustomInput value={OT.Marca} onChange={(e) => editOT("Marca", e)} placeholder={"Marca"} />
                    </div>
                    <div className={Style.DataInput}>
                        <CustomInput value={OT.Modelo} onChange={(e) => editOT("Modelo", e)} placeholder={"Modelo"} />
                    </div>
                    <div className={Style.DataInput}>
                        <CustomInput value={OT.NormaAplicar} onChange={(e) => editOT("NormaAplicar", e)} placeholder={"Norma a aplicar"} />
                    </div>
                    <div className={Style.DataInput}>
                        <CustomInput value={OT.Cotizacion} onChange={(e) => editOT("Cotizacion", e)} placeholder={"Cotización"} />
                    </div>
                    <div className={Style.DataInput}>
                        <CustomInput value={OT.nLacre} onChange={(e) => editOT("nLacre", e)} placeholder={"Numero de Lacre"} />
                    </div>
                    <div className={Style.DataInput}>
                        <TextField
                            placeholder={"Observaciones"}
                            fullWidth
                            value={OT.Observations}
                            onChange={({ target: { value } }) => editOT("Observations", value)}
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={3}
                        />
                    </div>
                </div>
                <div className={Style.inputsContainer}>
                    {OT.Description.map((data, key) => (
                        <div key={key} className={Style.DataInput}>
                            <div className={Style.Description}>
                                <div className={Style.ItemTable}>
                                    <span>Item</span>
                                    <CustomInput
                                        value={data.item}
                                        onChange={(e) => handleChangeDescription(e, key, "item")}
                                    />
                                </div>
                                <div className={Style.ItemTable}>
                                    <span>Importe</span>
                                    <CustomInput
                                        value={data.import}
                                        onChange={(e) => handleChangeDescription(e, key, "import")}
                                    />
                                </div>
                            </div>
                            <TextField
                                placeholder={"Descripción"}
                                fullWidth
                                value={data.Description}
                                onChange={(e) => handleChangeDescription(e.target.value, key, "Description")}
                                id="outlined-multiline-flexible"
                                multiline
                                maxRows={3}
                            />
                        </div>
                    ))}
                    <Button onClick={() => editOT("Description", [...OT.Description, { item: "", Description: "", import: 0 }])} variant='outlined' sx={{ borderRadius: "15px", margin: "15px 0", width: "100%" }}>
                        <div>
                            <AddIcon />
                        </div>
                        <p>
                            Agregar Descripción
                        </p>
                    </Button>

                    <div className={Style.dateSection}>
                        <p className={Style.TittleType}>Fecha de entrega estimada:</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{ paddingTop: "10px", width: "100%" }}
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: 'small' } }}
                                value={OT.FechaEstimada} onChange={(e) => editOT("FechaEstimada", e)} />
                        </LocalizationProvider>
                    </div>
                    <div className={Style.dateSection}>
                        <p className={Style.TittleType}>Fecha de vencimiento del certificado:</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{ paddingTop: "10px", width: "100%" }}
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: 'small' } }}
                                value={OT.FechaVencimiento} onChange={(e) => editOT("FechaVencimiento", e)} />

                        </LocalizationProvider>
                    </div>
                </div>
            </div >
            <div className={Style.ButtonSave}>
                <Button disabled={isSaveOTDisabled} onClick={submitUseOT} fullWidth variant="contained">Guardar OT</Button>
            </div>
            <ToastList
                listData={toasts}
            />
            {isSave && (
                <ModalPortal type={"form"}>
                    <PrintOtModal Result={isSave} close={setIsSave} />
                </ModalPortal>
            )}
        </form >
    );
}

const isNullUndefined = (data) => (data === null | data === undefined ? "" : data)

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#bed1d8',
        height: "20px",
        width: "100%",
        padding: '10px 12px',
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
}));
const CustomInput = forwardRef(function CustomInput(props, ref) {
    let value = props.value;
    let onChange = props.onChange;
    let placeholder = props.placeholder;
    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={({ target: { value } }) => {
                onChange(value)
            }}
            slots={{ input: StyledInputElement }}
            ref={ref} />
    );
});
const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};
const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};
const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 100%;
    height: 20px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 17px;
    border-radius: 12px;
    color: ${grey[900]};
    background: ${'#fff'};
    border: 1px solid ${grey[200]};
    box-shadow: 0px 2px 2px ${grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
export default FormCreateOt;