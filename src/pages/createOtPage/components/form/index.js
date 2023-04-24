import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import Style from './formCreateOt.module.css'
import InputUnstyled from '@mui/base/InputUnstyled';
import { Autocomplete, Button, InputBase, MenuItem, Select, TextField } from '@mui/material';
import ModalPortal from '../../../../components/modelPortal';
import Alerts from '../../../../components/alerts';
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import postData from '../../../../hooks/postData';

function FormCreateOt({ Date }) {
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
    const handleSubmit = () => {
        let Client = ClientObjet.label;
        let ContactSelect = ClientObjet.Contacts[Contacts];
        const OT = {
            Date,
            Client,
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
            ContactSelect
        }
        postData('http://localhost:4000/postOT', OT)
            .then(json => setResult(json));
    }

    useEffect(() => {
        getDataFromUrl('http://localhost:4000/getClients')
            .then(json => {
                let newJson = []
                json.forEach(element => {
                    console.log()
                    let data = { label: element.Name, id: element.id, KeyUnique: element.KeyUnique, businessName: element.businessName, Contacts: JSON.parse(element.Contacts) };
                    newJson.push(data)
                });
                setClients(newJson)
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
                                <MenuItem value={"Reducido"}>Reducido</MenuItem >
                                <MenuItem value={"Verif. Identidad"} >Verif. Identidad</MenuItem >
                                <MenuItem value={"Ampliado"} >Ampliado</MenuItem >
                                <MenuItem value={"Ensayo Eficiencia"} >Ensayo Eficiencia</MenuItem >
                                <MenuItem value={"Ensayo Completo"} >Ensayo Completo</MenuItem >
                                <MenuItem value={"Otra actividad"} >Otra actividad</MenuItem >
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
                <ModalPortal type={"alert"}>
                    <Alerts Result={Result.result} />
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
        <InputUnstyled
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
        <InputUnstyled
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
// const top100Films = [
//     { label: '', year: "" },
//     { label: 'The Shawshank Redemption', year: 1994 },
//     { label: 'The Godfather', year: 1972 },
//     { label: 'The Godfather: Part II', year: 1974 },
//     { label: 'The Dark Knight', year: 2008 },
//     { label: '12 Angry Men', year: 1957 },
//     { label: "Schindler's List", year: 1993 },
//     { label: 'Pulp Fiction', year: 1994 },
//     {
//         label: 'The Lord of the Rings: The Return of the King',
//         year: 2003,
//     },
//     { label: 'The Good, the Bad and the Ugly', year: 1966 },
//     { label: 'Fight Club', year: 1999 },
//     {
//         label: 'The Lord of the Rings: The Fellowship of the Ring',
//         year: 2001,
//     },
//     {
//         label: 'Star Wars: Episode V - The Empire Strikes Back',
//         year: 1980,
//     },
//     { label: 'Forrest Gump', year: 1994 },
//     { label: 'Inception', year: 2010 },
//     {
//         label: 'The Lord of the Rings: The Two Towers',
//         year: 2002,
//     },
//     { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { label: 'Goodfellas', year: 1990 },
//     { label: 'The Matrix', year: 1999 },
//     { label: 'Seven Samurai', year: 1954 },
//     {
//         label: 'Star Wars: Episode IV - A New Hope',
//         year: 1977,
//     },
//     { label: 'City of God', year: 2002 },
//     { label: 'Se7en', year: 1995 },
//     { label: 'The Silence of the Lambs', year: 1991 },
//     { label: "It's a Wonderful Life", year: 1946 },
//     { label: 'Life Is Beautiful', year: 1997 },
//     { label: 'The Usual Suspects', year: 1995 },
//     { label: 'Léon: The Professional', year: 1994 },
//     { label: 'Spirited Away', year: 2001 },
//     { label: 'Saving Private Ryan', year: 1998 },
//     { label: 'Once Upon a Time in the West', year: 1968 },
//     { label: 'American History X', year: 1998 },
//     { label: 'Interstellar', year: 2014 },
//     { label: 'Casablanca', year: 1942 },
//     { label: 'City Lights', year: 1931 },
//     { label: 'Psycho', year: 1960 },
//     { label: 'The Green Mile', year: 1999 },
//     { label: 'The Intouchables', year: 2011 },
//     { label: 'Modern Times', year: 1936 },
//     { label: 'Raiders of the Lost Ark', year: 1981 },
//     { label: 'Rear Window', year: 1954 },
//     { label: 'The Pianist', year: 2002 },
//     { label: 'The Departed', year: 2006 },
//     { label: 'Terminator 2: Judgment Day', year: 1991 },
//     { label: 'Back to the Future', year: 1985 },
//     { label: 'Whiplash', year: 2014 },
//     { label: 'Gladiator', year: 2000 },
//     { label: 'Memento', year: 2000 },
//     { label: 'The Prestige', year: 2006 },
//     { label: 'The Lion King', year: 1994 },
//     { label: 'Apocalypse Now', year: 1979 },
//     { label: 'Alien', year: 1979 },
//     { label: 'Sunset Boulevard', year: 1950 },
//     {
//         label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//         year: 1964,
//     },
//     { label: 'The Great Dictator', year: 1940 },
//     { label: 'Cinema Paradiso', year: 1988 },
//     { label: 'The Lives of Others', year: 2006 },
//     { label: 'Grave of the Fireflies', year: 1988 },
//     { label: 'Paths of Glory', year: 1957 },
//     { label: 'Django Unchained', year: 2012 },
//     { label: 'The Shining', year: 1980 },
//     { label: 'WALL·E', year: 2008 },
//     { label: 'American Beauty', year: 1999 },
//     { label: 'The Dark Knight Rises', year: 2012 },
//     { label: 'Princess Mononoke', year: 1997 },
//     { label: 'Aliens', year: 1986 },
//     { label: 'Oldboy', year: 2003 },
//     { label: 'Once Upon a Time in America', year: 1984 },
//     { label: 'Witness for the Prosecution', year: 1957 },
//     { label: 'Das Boot', year: 1981 },
//     { label: 'Citizen Kane', year: 1941 },
//     { label: 'North by Northwest', year: 1959 },
//     { label: 'Vertigo', year: 1958 },
//     {
//         label: 'Star Wars: Episode VI - Return of the Jedi',
//         year: 1983,
//     },
//     { label: 'Reservoir Dogs', year: 1992 },
//     { label: 'Braveheart', year: 1995 },
//     { label: 'M', year: 1931 },
//     { label: 'Requiem for a Dream', year: 2000 },
//     { label: 'Amélie', year: 2001 },
//     { label: 'A Clockwork Orange', year: 1971 },
//     { label: 'Like Stars on Earth', year: 2007 },
//     { label: 'Taxi Driver', year: 1976 },
//     { label: 'Lawrence of Arabia', year: 1962 },
//     { label: 'Double Indemnity', year: 1944 },
//     {
//         label: 'Eternal Sunshine of the Spotless Mind',
//         year: 2004,
//     },
//     { label: 'Amadeus', year: 1984 },
//     { label: 'To Kill a Mockingbird', year: 1962 },
//     { label: 'Toy Story 3', year: 2010 },
//     { label: 'Logan', year: 2017 },
//     { label: 'Full Metal Jacket', year: 1987 },
//     { label: 'Dangal', year: 2016 },
//     { label: 'The Sting', year: 1973 },
//     { label: '2001: A Space Odyssey', year: 1968 },
//     { label: "Singin' in the Rain", year: 1952 },
//     { label: 'Toy Story', year: 1995 },
//     { label: 'Bicycle Thieves', year: 1948 },
//     { label: 'The Kid', year: 1921 },
//     { label: 'Inglourious Basterds', year: 2009 },
//     { label: 'Snatch', year: 2000 },
//     { label: '3 Idiots', year: 2009 },
//     { label: 'Monty Python and the Holy Grail', year: 1975 },
// ];

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

export default FormCreateOt;