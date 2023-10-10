import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import inputClass from '../../../classes/inputClass';
import toUppercase from '../../../hooks/toUppercase';
import { useEffect, useRef, useState } from 'react';
import { closeEsc } from '../../../hooks/closeEsc';
import Style from './formCreateClient.module.css';
import addClient from '../../../db/addClient';
import ModalPortal from '../../modelPortal';
import Alerts from '../../alerts';
import AddIcon from '@mui/icons-material/Add';
import editClient from '../../../db/editClient';

function FormCreateClient({ close, reload, data }) {
    console.log(data)
    const divRef = useRef(null);
    const [Contacts, setContacts] = useState(data ? JSON.parse(data.Contacts) : [{ type: "", value: "" }]);

    const initialDocument = data ? JSON.parse(data.Document) : [{ type: "", value: "" }];
    const [Document, setDocument] = useState({ type: initialDocument.type, value: initialDocument.value });
    const [nameClient, setNameClient] = useState(data ? data.Name : "");
    const [Result, setResult] = useState();
    const [Key, setKey] = useState(data ? data.KeyUnique : "");
    useEffect(() => {
        const divElement = divRef.current;
        if (divElement) {
            divElement.addEventListener('keydown', e => closeEsc(e, close));
        }
        return () => {
            divElement.removeEventListener('keydown', closeEsc);
        };
    }, [close])
    const handleSubmit = async () => {
        let isFull = (Contacts) => {
            let newContacts = Contacts.filter(e => (
                e.type.length > 0 && e.value.length > 0
            ))
            return newContacts
        }
        let ContactVerificate = isFull(Contacts)
        if (!ContactVerificate[0] || !nameClient || !Document.type || !Document.value || !Key) {
            setResult("missed data")
            setTimeout(() => {
                setResult()
            }, 3400);
            return
        }
        let Client = {
            nameClient: toUppercase(nameClient),
            Document,
            Key,
            ContactVerificate
        }
        let resultClient;
        if (data) {
            const sameName = nameClient === data.Name
            const sameKey = Key === data.KeyUnique
            const dataToEdit = { ...Client, id: data.id }
            resultClient = await editClient(dataToEdit, sameKey, sameName)
        } else {
            resultClient = await addClient(Client)
        }
        setResult(resultClient)
        setTimeout(() => {
            setResult()
        }, 3400);
        if (resultClient !== "name used") {
            close && reload()
            close && close()
            reload()
            resetAllData()
        }
        return

    };
    const handleChangeDocument = (e, type) => {
        const value = e.target ? e.target.value : e
        let updateValue = {};
        updateValue[type] = value;
        setDocument(Document => ({
            ...Document,
            ...updateValue
        }))
    };
    const handleChangeContacts = (e, number, type) => {
        let copy = [...Contacts]
        copy[number][type] = e;
        setContacts(copy)
    };
    const resetAllData = () => {
        setNameClient("")
        setDocument({ type: "", value: "" })
        setKey("")
        setContacts([{ type: "", value: "", id: 0 }, { type: "", value: "", id: 1 }, { type: "", value: "", id: 2 }])
    }
    const addContact = () => {
        setContacts(prev => [...prev, { type: "", value: "" }])
    }
    const inputClient = new inputClass(handleSubmit)
    return (
        <div className={Style.ContentForm} ref={divRef} tabIndex="0">
            <div className={Style.TittleForm}>
                {data ? (
                    <p>Actualizar Cliente</p>
                ) : (
                    <p>Crear Cliente</p>
                )}
            </div>
            <form className={Style.FormClient}>
                <div className={Style.DataInputs}>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Nombre:</p>
                        </div>
                        {inputClient.getInput(nameClient, setNameClient)}
                    </div>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Código:</p>
                        </div>
                        {inputClient.getInput(Key, setKey)}
                    </div>
                    <div className={Style.InputDocument}>
                        <div className={Style.TypeDocument}>
                            <div className={Style.InputTittleDocument}>
                                <p>Tipo de ID fiscal:</p>
                            </div>
                            <div className={Style.CustomInput}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Documento</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={Document.type}
                                        onChange={(e) => handleChangeDocument(e, "type")}
                                        label="Documento"
                                    >
                                        <MenuItem value={"DNI"}>DNI</MenuItem>
                                        <MenuItem value={"CUIT"}>CUIT</MenuItem>
                                        <MenuItem value={"RUMP"}>RUMP</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className={Style.NDocument}>
                            <div className={Style.InputTittleDocument}>
                                <p>ID fiscal:</p>
                            </div>
                            <div className={Style.CustomInput}>
                                {inputClient.getInput(Document.value, (e) => handleChangeDocument(e, "value"))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.DataContacts}>
                    <div className={Style.ContentContacts}>
                        <p className={Style.TittleContacts}>Contactos:</p>
                    </div>
                    <div>
                        {Contacts.map((data, key) => (
                            <div className={Style.InputContact} key={key}>
                                <div className={Style.TypeDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Tipo de Contacto:</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        {inputClient.getInput(data.type, (e) => handleChangeContacts(e, key, "type"))}
                                    </div>
                                </div>
                                <div className={Style.NDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Contacto:</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        {inputClient.getInput(data.value, (e) => handleChangeContacts(e, key, "value"))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button onClick={() => addContact()} variant='outlined' sx={{ borderRadius: "15px" }}>
                            <div>
                                <AddIcon />
                            </div>
                            <p>
                                Agregar Contacto
                            </p>
                        </Button>
                    </div>
                </div>
                <div className={Style.ButtonSave}>
                    {close && (
                        <Button onClick={() => close(false)} variant="outlined">Cancel</Button>
                    )}
                    <Button onClick={handleSubmit} sx={{ width: "25%" }} color='success' variant="contained">Guardar cliente</Button>
                </div>
            </form>
            {Result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={Result} />
                </ModalPortal>
            )}
        </div>
    );
}

export default FormCreateClient;