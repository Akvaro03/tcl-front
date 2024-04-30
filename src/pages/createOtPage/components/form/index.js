import { Autocomplete, Box, Button, InputBase, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import MultipleSelect from '../../../../components/multipleSelect';
import classToastList from '../../../../classes/classToastList';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import ModalPortal from '../../../../components/modelPortal';
import ToastList from '../../../../components/toastList';
import toUppercase from '../../../../hooks/toUppercase';
import PrintOt from '../../../../components/printOt';
import React, { useEffect, useState } from 'react';
import getOTkey from '../../../../hooks/getOTkey';
import getUser from '../../../../hooks/getUser';
import TypeOt from '../../../../types/typeOt';
import AddIcon from '@mui/icons-material/Add';
import Style from './formCreateOt.module.css';
import addOt from '../../../../db/addOt';
import styled from "@emotion/styled";
import Input from '@mui/base/Input';
import dayjs from 'dayjs';
import SelectContact from '../../../../components/selectContract';

function FormCreateOt() {
    const [Clients, setClients] = useState([{ label: "Seleccione" }])
    const [contractSelect, setContractSelect] = useState()
    const [ClientObjet, setClientObjet] = useState(top100Films[0])
    const [FechaVencimiento, setFechaVencimiento] = useState(dayjs)
    const [Observations, setObservations] = useState("")
    const [NormaAplicar, setNormaAplicar] = useState("")
    const [OTKey, setOTKey] = useState("")

    const [Description, setDescription] = useState([{ item: "", Description: "", import: 0 }]);

    const [DateForm, setDateForm] = useState(dayjs)
    const [FechaEstimada, setFechaEstimada] = useState(dayjs)

    const [Cotizacion, setCotizacion] = useState("")
    const [nLacre, setNLacre] = useState("")
    const [Contacts, setContacts] = useState("")
    const [Producto, setProducto] = useState("")
    const [allTypes, setAllTypes] = useState([])
    const [Modelo, setModelo] = useState("")
    const [Marca, setMarca] = useState("")
    const [Type, SetType] = useState("")

    const [toasts, setToasts] = useState([]);
    const [Result, setResult] = useState(null)
    const [userLogin, setUserLogin] = useState()
    const [isSaveOtDisabled, setIsSaveOtDisabled] = useState(false)

    const handleSubmit = async () => {
        try {
            setIsSaveOtDisabled(true)
            const Activities = allTypes[Type].activities;
            const ContactSelect = Contacts ? Contacts.map(data => ClientObjet.Contacts[Number(data.substring(0, 1)) - 1]) : "";
            const { Name: Client } = ClientObjet;
            const TypeString = allTypes[Type];
            const Changes = {
                userId: userLogin.id,
                userName: userLogin.name,
                ChangeDescription: `Se creó la OT`,
                date: new Date(DateForm).getTime(),
                comment: ""
            };
            const newOt = new TypeOt({
                Date: DateForm,
                Client,
                IdClient: ClientObjet.idEditable,
                Producto,
                Marca,
                Modelo,
                NormaAplicar,
                Cotizacion,
                nLacre,
                FechaVencimiento,
                FechaEstimada,
                Type: TypeString,
                Description,
                Observations,
                Contact: ContactSelect,
                Changes,
                Activities,
                OTKey,
                contractName: contractSelect
            });
            if (!newOt.verificateCreateOt()) {
                classToastList.addToast(setToasts, "missed data");
                setIsSaveOtDisabled(false)
                return
            }
            const resultPost = await addOt(newOt);
            if (resultPost.substring(0, 5) === "ok ot") {
                resetAllData()
            }
            setResult(resultPost.substring(6, 10));
            setIsSaveOtDisabled(false)
        } catch (error) {
            console.log(error)
            classToastList.addToast(setToasts, "missed data");
            setIsSaveOtDisabled(false)
        }
    };
    const handleTypeChange = (value) => {
        SetType(value)
        formatKey(value, ClientObjet)
        const maxDate = JSON.parse(allTypes[value].activities).reduce((prev, cont) => prev > cont.time ? prev : cont.time, 0)
        setFechaEstimada(FechaEstimada.add(maxDate, `day`))
    }
    const handleClient = (data) => {
        setClientObjet(data);
        formatKey(Type, data)
    }
    const resetAllData = () => {
        const resets = [
            setProducto,
            setMarca,
            setModelo,
            setNormaAplicar,
            setCotizacion,
            setObservations
        ];
        resetInputs(resets);
    }

    useEffect(() => {
        getDataFromUrl('/getClients')
            .then(json => {
                setUserLogin(getUser())
                let newJson = []
                json.forEach(element => {
                    let data = { label: `${element.KeyUnique}  -   ${element.Name}`, idEditable: element.idEditable, id: element.id, KeyUnique: element.KeyUnique, Name: element.Name, Contacts: element.Contacts ? JSON.parse(element.Contacts) : "" };
                    newJson.push(data)
                });
                setClients(newJson)
            })
        getDataFromUrl('/getTypeOt')
            .then(json => {
                setAllTypes(json)
            });
        getOTkey()
            .then(data => setOTKey(prevValue => prevValue ? prevValue : data))
    }, [])

    const onChangeDate = (date) => {
        setDateForm(date)
        formatKey(Type, ClientObjet, date)
    }

    const formatKey = (tipo, Client, date = DateForm) => {
        getOTkey(date)
        const type = allTypes[tipo] ? allTypes[tipo].abbreviation : "";
        getOTkey(date)
            .then(data => setOTKey(data + " " + type + " " + Client.KeyUnique))
    }
    const addDescription = () => {
        setDescription(prev => [...prev, { item: "", Description: "", import: 0 }])
    }
    const handleChangeDescription = (e, number, type) => {
        const { value } = e.target
        let copy = [...Description]
        copy[number][type] = type === "Description" && value ? toUppercase(value) : value;
        setDescription(copy)
    };

    return (
        <form className={Style.Form}>
            <div className={Style.ContentForm}>
                <div className={Style.Content}>
                    <div className={Style.PartLeft}>

                        <div className={Style.Identification}>
                            <p >ID:</p>
                            <div className={Style.InputIdentification}>
                                <BootstrapInput value={OTKey} disabled id="outlined-basic" variant="outlined" />
                            </div>
                        </div>
                        <Box sx={{ paddingTop: "10px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disableFuture
                                    format="DD/MM/YYYY"
                                    slotProps={{ textField: { size: 'small' } }}
                                    value={DateForm} onChange={onChangeDate} />
                            </LocalizationProvider>
                        </Box>

                        <div className={Style.SelectType}>
                            <p className={Style.TittleType}>Seleccionar Tipo:</p>
                            <Select sx={{ height: "45px", width: "80%" }} fullWidth onChange={({ target: { value } }) => handleTypeChange(value)} placeholder='Selecciona el tipo de OT' defaultValue={""}>
                                {allTypes.map((type, index) => (
                                    <MenuItem key={index} value={index}>{type.nameType}</MenuItem >
                                ))}
                            </Select>
                        </div>

                        <div className={Style.SelectClient}>
                            <Autocomplete
                                disablePortal
                                disableClearable
                                onChange={(event, newValue) => {
                                    handleClient(newValue);
                                }}
                                id="combo-box-demo"
                                options={Clients}
                                sx={{ width: "80%" }}
                                renderInput={(params) => <TextField {...params} label="Cliente" />}
                            />
                        </div>
                        <div className={Style.SelectClient}>
                            <SelectContact setData={setContractSelect} />
                        </div>
                        <div className={Style.ClientData}>
                            <div className={Style.ClientDataContent}>
                                <p >Client N°:</p>
                                <div className={Style.InputDisabled}>
                                    <BootstrapInput value={ClientObjet.idEditable} disabled id="outlined-basic" variant="outlined" />
                                </div>
                            </div>
                            <div className={Style.ClientDataContent}>
                                <p >Clave Única:</p>
                                <div className={Style.InputDisabled}>
                                    <BootstrapInput value={ClientObjet.KeyUnique} disabled id="outlined-basic" variant="outlined" />
                                </div>
                            </div>
                        </div>

                        <div className={Style.SelectType}>
                            <p className={Style.TittleType}>Seleccionar Contacto:</p>
                            {ClientObjet.Contacts && (
                                <MultipleSelect size={"medium"} onchange={(value) => setContacts(value)} names={ClientObjet.Contacts.map(((ContactClient, key) => ((key + 1) + " " + ContactClient.type + ": " + ContactClient.value)))} label={"Contactos seleccionados"} />
                            )}
                        </div>

                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <CustomInput value={Producto} onChange={setProducto} placeholder={"Producto"} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <CustomInput placeholder={"Marca"} value={Marca} onChange={setMarca} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <CustomInput placeholder={"Modelo"} value={Modelo} onChange={setModelo} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <CustomInput placeholder={"Norma a aplicar"} value={NormaAplicar} onChange={setNormaAplicar} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <CustomInput placeholder={"Cotización"} value={Cotizacion} onChange={setCotizacion} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <CustomInput placeholder={"Numero de Lacre"} value={nLacre} onChange={setNLacre} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <p className={Style.TittleType}>Fecha de vencimiento del certificado:</p>
                                <Box sx={{ paddingTop: "10px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            slotProps={{ textField: { size: 'small' } }}
                                            value={FechaVencimiento} onChange={setFechaVencimiento} />
                                    </LocalizationProvider>
                                </Box>
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <p className={Style.TittleType}>Fecha de entrega estimada:</p>
                                <Box sx={{ paddingTop: "10px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            slotProps={{ textField: { size: 'small' } }}
                                            value={FechaEstimada} onChange={setFechaEstimada} />
                                    </LocalizationProvider>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className={Style.PartRight}>
                        <div className={Style.DataInput}>
                            <p className={Style.TittleType}>Detalle del trabajo solicitado:</p>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Description}>
                                <Box display={"grid"} marginBottom={"5px"} gap={"5px"} gridTemplateColumns={"1fr 1fr 1fr"} justifyItems={"center"}>
                                    <Box height={"5%"}>
                                        <span>Item</span>
                                    </Box>
                                    <Box height={"5%"}>
                                        <span>Descripción</span>
                                    </Box>
                                    <Box height={"5%"}>
                                        <span>Importe</span>
                                    </Box>
                                </Box>
                                {Description.map((data, key) => (
                                    <Box key={key} display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} justifyItems={"center"} gap={"5px"} marginBottom={"5px"}>
                                        <div className={Style.ItemTable}>
                                            <BootstrapInput value={data.item} onChange={(e) => handleChangeDescription(e, key, "item")} id="outlined-basic" variant="outlined" />
                                        </div>
                                        <div className={Style.DescriptionTable}>
                                            <BootstrapInput value={data.Description} onChange={(e) => handleChangeDescription(e, key, "Description")} id="outlined-basic" variant="outlined" />
                                        </div>
                                        <div >
                                            <BootstrapInput type='number' value={data.import} onChange={(e) => handleChangeDescription(e, key, "import")} id="outlined-basic" variant="outlined" />
                                        </div>
                                    </Box>
                                ))}
                                <Button onClick={addDescription} variant='outlined' sx={{ borderRadius: "15px", margin: "15px 0", width: "100%" }}>
                                    <div>
                                        <AddIcon />
                                    </div>
                                    <p>
                                        Agregar Descripción
                                    </p>
                                </Button>
                            </div>
                        </div>
                        <div className={Style.FieldObser}>
                            <TextField
                                placeholder={"Observaciones"}
                                fullWidth
                                value={Observations}
                                onChange={({ target: { value } }) => setObservations(value)}
                                sx={{ marginTop: 2 }}
                                id="outlined-multiline-flexible"
                                multiline
                                maxRows={3}
                            />
                        </div>
                    </div>
                </div>
                <div className={Style.ButtonSave}>
                    <Button disabled={isSaveOtDisabled} onClick={handleSubmit} fullWidth variant="contained">Guardar OT</Button>
                </div>
            </div>
            <ToastList
                listData={toasts}
            />

            {Result && (
                <ModalPortal type={"form"}>
                    <PrintOt Result={Result} close={setResult} />
                </ModalPortal>
            )}
        </form>
    );
}



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
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
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
const top100Films = [
    {
        id: "",
        KeyUnique: "",
        businessName: "",
        Contacts: "",
        label: "",
        idEditable: ""
    }
];
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#bed1d8',
        height: "20px",
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

const resetInputs = (resets) => {
    resets.forEach(reset => reset(""))
}
export default FormCreateOt;