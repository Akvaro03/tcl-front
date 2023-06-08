import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import Style from './formCreateOt.module.css'
import Input from '@mui/base/Input';
import { Autocomplete, Button, InputBase, MenuItem, Select, TextField } from '@mui/material';
import ModalPortal from '../../../../components/modelPortal';
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import postData from '../../../../hooks/postData';
import getUser from '../../../../components/getUser';
import ModalCallback from '../ModalCallback';

function FormCreateOt({ DateCreate }) {
    const [Clients, setClients] = useState([{ label: "Seleccione" }])
    const [ClientObjet, setClientObjet] = useState(top100Films[0])
    const [RazonSocial] = useState("")
    const [Producto, setProducto] = useState("")
    const [Marca, setMarca] = useState("")
    const [Modelo, setModelo] = useState("")
    const [NormaAplicar, setNormaAplicar] = useState("")
    const [Cotizacion, setCotizacion] = useState("")
    const [FechaVencimiento, setFechaVencimiento] = useState("")
    const [FechaEstimada, setFechaEstimada] = useState("")
    const [Contacts, setContacts] = useState("")

    const [allTypes, setAllTypes] = useState([])
    const [Identificación] = useState("Identificacion")
    const [Type, SetType] = useState("")
    const [Description, setDescription] = useState({
        Item1: "",
        Description1: "",
        Importe1: "",
        Item2: "",
        Description2: "",
        Importe2: "",
        Item3: "",
        Description3: "",
        Importe3: "",
    })
    const [Observaciones, setObservaciones] = useState("")

    const [Result, setResult] = useState(null)
    const [userLogin, setUserLogin] = useState()

    const handleSubmit = async () => {
        let Client = ClientObjet.label;
        let ContactSelect = ClientObjet.Contacts[Contacts];
        const activities = allTypes[Type].activities;
        const Changes = {
            userId: userLogin.id,
            userName: userLogin.name,
            ChangeDescription: `Se creo el Ot`,
            date: new Date(DateCreate).getTime(),
            comment: ""
        }
        const OT = {
            Date: new Date(DateCreate).getTime(),
            Client,
            IdClient: ClientObjet.id,
            RazonSocial,
            Producto,
            Marca,
            Modelo,
            NormaAplicar,
            Cotizacion,
            FechaVencimiento,
            FechaEstimada,
            Type,
            Description,
            Observaciones,
            ContactSelect,
            Changes,
            activities
        }
        const resultPost = await postData('http://localhost:4000/postOT', OT)
        const resets = [
            setProducto,
            setMarca,
            setModelo,
            setNormaAplicar,
            setCotizacion,
            setFechaEstimada,
            setFechaVencimiento,
        ]
        if (resultPost.result.substring(0, 5) === "ok ot") {
            resetInputs(resets)
        }
        setResult(resultPost.result.substring(6, 7))
    }

    useEffect(() => {
        getDataFromUrl('http://localhost:4000/getClients')
            .then(json => {
                setUserLogin(JSON.parse(JSON.parse(getUser()).userString))
                let newJson = []
                json.forEach(element => {
                    let data = { label: element.Name, id: element.id, KeyUnique: element.KeyUnique, businessName: element.businessName, Contacts: JSON.parse(element.Contacts) };
                    newJson.push(data)
                });
                setClients(newJson)
            })
        getDataFromUrl('http://localhost:4000/getTypeOt')
            .then(json => {
                setAllTypes(json)
            })
    }, [])

    return (
        <form className={Style.Form}>
            <div className={Style.ContentForm}>
                <div className={Style.Content}>
                    <div className={Style.PartLeft}>
                        <div className={Style.SelectClient}>
                            <p className={Style.TittleClient}>Seleccionar Cliente</p>
                            <Autocomplete
                                disablePortal
                                disableClearable
                                onChange={(event, newValue) => {
                                    setClientObjet(newValue);
                                }}
                                id="combo-box-demo"
                                options={Clients}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Cliente" />}
                            />
                        </div>
                        <div className={Style.ClientData}>
                            <div className={Style.ClientDataContent}>
                                <p >Client N°</p>
                                <div className={Style.InputDisabled}>
                                    <BootstrapInput value={ClientObjet.id} disabled id="outlined-basic" variant="outlined" />
                                </div>
                            </div>
                            <div className={Style.ClientDataContent}>
                                <p >Clave Unica</p>
                                <div className={Style.InputDisabled}>
                                    <BootstrapInput value={ClientObjet.KeyUnique} disabled id="outlined-basic" variant="outlined" />
                                </div>
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <p className={Style.TittleData}>Razon social</p>
                            <div className={Style.InputDisabled}>
                                <BootstrapInput value={ClientObjet.businessName} disabled id="outlined-basic" variant="outlined" />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <p className={Style.TittleData}>Producto</p>
                            <div className={Style.Input}>
                                <CustomInput value={Producto} onChange={setProducto} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <p className={Style.TittleData}>Marca</p>
                            <div className={Style.Input}>
                                <CustomInput value={Marca} onChange={setMarca} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <p className={Style.TittleData}>Modelo</p>
                            <div className={Style.Input}>
                                <CustomInput value={Modelo} onChange={setModelo} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <p className={Style.TittleData}>Norma a aplicar</p>
                            <div className={Style.Input}>
                                <CustomInput value={NormaAplicar} onChange={setNormaAplicar} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <p className={Style.TittleData}>Cotización</p>
                            <div className={Style.Input}>
                                <CustomInput value={Cotizacion} onChange={setCotizacion} />
                            </div>
                        </div>
                        <div className={Style.DataInputLarge}>
                            <p className={Style.TittleDataLarge}>Fecha de vencimiento del certificado</p>
                            <div className={Style.InputLarge}>
                                <CustomInput value={FechaVencimiento} onChange={setFechaVencimiento} />
                            </div>
                        </div>
                        <div className={Style.DataInputLarge}>
                            <p className={Style.TittleDataLarge}>Fecha de entrega estimada</p>
                            <div className={Style.InputLarge}>
                                <CustomInput value={FechaEstimada} onChange={setFechaEstimada} />
                            </div>
                        </div>
                    </div>
                    <div className={Style.PartRight}>
                        <div className={Style.Identification}>
                            <p >Identificación</p>
                            <div className={Style.InputIdentification}>
                                <BootstrapInput value={Identificación} disabled id="outlined-basic" variant="outlined" />
                            </div>
                        </div>
                        <div className={Style.SelectType}>
                            <p className={Style.TittleType}>Seleccionar tipo de OT</p>
                            <Select sx={{ height: "45px" }} fullWidth onChange={({ target: { value } }) => SetType(value)} placeholder='Selecciona el tipo de OT' defaultValue={""}>
                                {allTypes.map((type, index) => (
                                    <MenuItem key={index} value={index}>{type.nameType}</MenuItem >
                                ))}
                                {/* <MenuItem value={"Reducido"}>Reducido</MenuItem >
                                <MenuItem value={"Verif. Identidad"} >Verif. Identidad</MenuItem >
                                <MenuItem value={"Ampliado"} >Ampliado</MenuItem >
                                <MenuItem value={"Ensayo Eficiencia"} >Ensayo Eficiencia</MenuItem >
                                <MenuItem value={"Ensayo Completo"} >Ensayo Completo</MenuItem >
                                <MenuItem value={"Otra actividad"} >Otra actividad</MenuItem > */}
                            </Select>
                        </div>
                        <div className={Style.DescriptionContent}>
                            <p className={Style.DescriptionTittle}>Descripcion del trabajo solicitado</p>
                            <div className={Style.Description}>
                                <p>Item</p>
                                <p>Descripcion</p>
                                <p>Importe</p>
                                <div className={Style.ItemTable}>
                                    <CustomInputTable position={"Item1"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.DescriptionTable}>
                                    <CustomInputTable position={"Description1"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.ImportTable}>
                                    <CustomInputTable position={"Importe1"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.ItemTable}>
                                    <CustomInputTable position={"Item2"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.DescriptionTable}>
                                    <CustomInputTable position={"Description2"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.ImportTable}>
                                    <CustomInputTable position={"Importe2"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.ItemTable}>
                                    <CustomInputTable position={"Item3"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.DescriptionTable}>
                                    <CustomInputTable position={"Description3"} value={Description} onChange={setDescription} />
                                </div>
                                <div className={Style.ImportTable}>
                                    <CustomInputTable position={"Importe3"} value={Description} onChange={setDescription} />
                                </div>
                            </div>
                        </div>
                        <div className={Style.FieldObser}>
                            <p>Observaciones</p>
                            <TextField
                                fullWidth
                                value={Observaciones}
                                onChange={({ target: { value } }) => setObservaciones(value)}
                                sx={{ marginTop: 2 }}
                                id="outlined-multiline-flexible"
                                multiline
                                maxRows={3}
                            />
                        </div>
                        <div className={Style.SelectType}>
                            <p className={Style.TittleType}>Seleccionar Contacto</p>
                            <Select sx={{ height: "45px" }} fullWidth onChange={({ target: { value } }) => setContacts(value)} defaultValue={""}>
                                {ClientObjet.Contacts && ClientObjet.Contacts.map((ContactClient, key) => (
                                    <MenuItem key={key} value={ContactClient.id}>{ContactClient.type + ": " + ContactClient.value}</MenuItem >
                                ))}
                            </Select>
                        </div>

                    </div>
                </div>
                <div className={Style.ButtonSave}>
                    <Button onClick={handleSubmit} fullWidth color='success' variant="contained">Guardar OT</Button>
                </div>
            </div>
            {Result && (
                <ModalPortal type={"form"}>
                    <ModalCallback Result={Result} setResult={setResult} />
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
    width: 80%;
    height: 5px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
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
    return (
        <Input
            value={value}
            onChange={({ target: { value } }) => {
                onChange(value)
            }}
            slots={{ input: StyledInputElement }}
            ref={ref} />
    );
});
const CustomInputTable = React.forwardRef(function CustomInput(props, ref) {
    let value2 = props.value;
    let position = props.position;
    let onChange = props.onChange;
    return (
        <Input
            onChange={({ target: { value } }) => {
                let json = {}
                json[position] = value;
                onChange({ ...value2, ...json })
            }}
            slots={{ input: StyledInputElement }}
            ref={ref} />
    );
});
const top100Films = [
    {
        id: "",
        Name: "",
        Document: "",
        KeyUnique: "",
        businessName: "",
        Contacts: ""
    }
];
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#bed1d8',
        height: "15px",
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