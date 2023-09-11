import { Autocomplete, Button, InputBase, MenuItem, Select, TextField } from '@mui/material';
import ModalPortal from '../../../../components/modelPortal';
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import React, { useEffect, useState } from 'react';
import Alerts from '../../../../components/alerts';
import getUser from '../../../../hooks/getUser';
import Style from './formCreateOt.module.css';
import ModalCallback from '../ModalCallback';
import styled from "@emotion/styled";
import Input from '@mui/base/Input';
import MultipleSelect from '../../../../components/multipleSelect';
import postData from '../../../../db/postData';
import getOTkey from '../../../../hooks/getOTkey';

function FormCreateOt({ DateCreate }) {
    const [Clients, setClients] = useState([{ label: "Seleccione" }])
    const [ClientObjet, setClientObjet] = useState(top100Films[0])
    const [FechaVencimiento, setFechaVencimiento] = useState("")
    const [FechaEstimada, setFechaEstimada] = useState("")
    const [Observaciones, setObservaciones] = useState("")
    const [NormaAplicar, setNormaAplicar] = useState("")
    const [Identificación, setIdentificación] = useState("")
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
    const [Cotizacion, setCotizacion] = useState("")
    const [Contacts, setContacts] = useState("")
    const [Producto, setProducto] = useState("")
    const [allTypes, setAllTypes] = useState([])
    const [Modelo, setModelo] = useState("")
    const [Marca, setMarca] = useState("")
    const [Type, SetType] = useState("")

    const [error, setError] = useState()
    const [Result, setResult] = useState(null)
    const [userLogin, setUserLogin] = useState()

    const handleSubmit = async () => {
        try {
            if (!Observaciones || !Description || !FechaEstimada || !FechaVencimiento || !Cotizacion || !NormaAplicar || !Modelo || !Marca || !allTypes[Type].activities || !ClientObjet || !Producto) {
                setError("missed data");
                setTimeout(() => {
                    setError();
                }, 3000);
                return
            }
            getOTkey()
                .then(data => setIdentificación(data + " " + allTypes[Type].nameType))
            const ContactSelect = Contacts ? Contacts.map(data => ClientObjet.Contacts[Number(data.substring(0, 1)) - 1]) : "";
            const { label: Client } = ClientObjet;
            const activities = allTypes[Type].activities;
            const TypeString = allTypes[Type];
            const Changes = {
                userId: userLogin.id,
                userName: userLogin.name,
                ChangeDescription: `Se creó el Ot`,
                date: new Date(DateCreate).getTime(),
                comment: ""
            };
            const OT = {
                Date: new Date(DateCreate).getTime(),
                Client,
                IdClient: ClientObjet.id,
                Producto,
                Marca,
                Modelo,
                NormaAplicar,
                Cotizacion,
                FechaVencimiento,
                FechaEstimada,
                Type: TypeString.nameType,
                Description,
                Observaciones,
                ContactSelect,
                Changes,
                activities,
                Identificación
            };
            const resultPost = await postData('http://localhost:4000/postOT', OT);
            const resets = [
                setProducto,
                setMarca,
                setModelo,
                setNormaAplicar,
                setCotizacion,
                setFechaEstimada,
                setFechaVencimiento
            ];

            if (resultPost.result.substring(0, 5) === "ok ot") {
                resetInputs(resets);
            }
            setResult(resultPost.result.substring(6, 7));
        } catch (error) {
            console.log(error)
            setError("missed data");
            setTimeout(() => {
                setError();
            }, 3000);
        }
    };
    const handleTypeChange = (value) => {
        SetType(value)
        formatKey(value, ClientObjet)
    }
    const handleClient = (data) => {
        setClientObjet(data);
        formatKey(Type, data)
    }
    useEffect(() => {
        getDataFromUrl('http://localhost:4000/getClients')
            .then(json => {
                setUserLogin(getUser())
                let newJson = []
                json.forEach(element => {
                    let data = { label: `${element.KeyUnique}  -   ${element.Name}`, id: element.id, KeyUnique: element.KeyUnique, businessName: element.businessName, Contacts: element.Contacts ? JSON.parse(element.Contacts) : "" };
                    newJson.push(data)
                });
                setClients(newJson)
            })
        getDataFromUrl('http://localhost:4000/getTypeOt')
            .then(json => {
                setAllTypes(json)
            });
        getOTkey()
            .then(data => setIdentificación(data))
    }, [])
    const formatKey = (tipo, Client) => {
        const type = allTypes[tipo] ? allTypes[tipo].abbreviation : "";
        getOTkey()
            .then(data => setIdentificación(data + " " + type + " " + Client.KeyUnique))
    }
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
                                    handleClient(newValue);
                                }}
                                id="combo-box-demo"
                                options={Clients}
                                sx={{ width: "80%" }}
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
                                <CustomInput placeholder={"Fecha de vencimiento del certificado"} value={FechaVencimiento} onChange={setFechaVencimiento} />
                            </div>
                        </div>
                        <div className={Style.DataInput}>
                            <div className={Style.Input}>
                                <CustomInput placeholder={"Fecha de entrega estimada"} value={FechaEstimada} onChange={setFechaEstimada} />
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
                            <Select sx={{ height: "45px" }} fullWidth onChange={({ target: { value } }) => handleTypeChange(value)} placeholder='Selecciona el tipo de OT' defaultValue={""}>
                                {allTypes.map((type, index) => (
                                    <MenuItem key={index} value={index}>{type.nameType}</MenuItem >
                                ))}
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
                            <TextField
                                placeholder={"Observaciones"}
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
                            {ClientObjet.Contacts && (
                                <MultipleSelect size={"medium"} onchange={(value) => setContacts(value)} names={ClientObjet.Contacts.map(((ContactClient, key) => ((key + 1) + " " + ContactClient.type + ": " + ContactClient.value)))} label={"Clientes seleccionados"} />
                            )}
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
            {error && (
                <ModalPortal type={"alert"} >
                    <Alerts Result={error} />
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
        KeyUnique: "",
        businessName: "",
        Contacts: "",
        label: ""
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