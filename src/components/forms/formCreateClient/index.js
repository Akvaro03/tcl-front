import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import inputClass from '../../../classes/inputClass';
import { useState } from 'react';
import Style from './formCreateClient.module.css';
import addClient from '../../../db/addClient';
import AddIcon from '@mui/icons-material/Add';
import editClient from '../../../db/editClient';
import FormPrototype from '../../formPrototype';
import TypeClient from '../../../types/typeClient';

function FormCreateClient({ close, reload, data, message }) {
    const initialDocument = data && data.Document ? JSON.parse(data.Document) : { type: '', value: '' };
    const [Contacts, setContacts] = useState(data && data.Contacts ? JSON.parse(data.Contacts) : [{ type: "", value: "" }]);
    const [Document, setDocument] = useState({ type: initialDocument.type, value: initialDocument.value });
    const [nameClient, setNameClient] = useState(data ? data.Name : "");
    const [location, setLocation] = useState(data ? data.location : "")
    const [Key, setKey] = useState(data ? data.KeyUnique : "");
    const handleSubmit = async () => {
        let isFull = (Contacts) => {
            let newContacts = Contacts.filter(e => (
                e.type.length > 0 && e.value.length > 0
            ))
            return newContacts
        }
        let ContactVerificate = isFull(Contacts)

        const newClient = new TypeClient(nameClient, Document, location, Key, ContactVerificate)
        if (!newClient.verificate()) {
            message("missed data")
            return
        }

        let resultClient;
        if (data) {
            const sameName = nameClient === data.Name
            const sameKey = Key === data.KeyUnique
            const dataToEdit = { ...newClient, id: data.id }
            
            resultClient = await editClient(dataToEdit, sameKey, sameName)
        } else {
            resultClient = await addClient(newClient)
        }
        message(resultClient)
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
        <FormPrototype close={close} tittle={data ? "Editar Cliente" : "Crear Cliente"} >
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
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Dirección total:</p>
                        </div>
                        {inputClient.getInput(location, setLocation)}
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
                    <Button onClick={handleSubmit} variant="contained">Guardar</Button>

                </div>
            </form>
        </FormPrototype>
    );
}

export default FormCreateClient;