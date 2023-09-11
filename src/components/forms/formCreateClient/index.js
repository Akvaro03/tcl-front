import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import inputClass from '../../../classes/inputClass';
import toUppercase from '../../../hooks/toUppercase';
import Style from './formCreateClient.module.css';
import nameUsed from '../../../db/nameUsed';
import ModalPortal from '../../modelPortal';
import postData from '../../../db/postData';
import { useState } from 'react';
import Alerts from '../../alerts';
function FormCreateClient({ close, reload }) {
    const [Contacts, setContacts] = useState([{ type: "", value: "", id: 0 }, { type: "", value: "", id: 1 }, { type: "", value: "", id: 2 }]);
    const [Document, setDocument] = useState({ type: "", value: "" });
    const [nameClient, setNameClient] = useState("");
    const [Result, setResult] = useState();
    const [Key, setKey] = useState("");
    let numberContacts = [0, 1, 2];

    const handleSubmit = async () => {
        let isFull = (Contacts) => {
            let newContacts = Contacts.filter(e => (
                e.type.length > 0 && e.value.length > 0
            ))
            return newContacts
        }
        let ContactVerificate = isFull(Contacts)
        if (!ContactVerificate[0] || !nameClient || !Document || !Key) {
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
        const isNameUsed = await nameUsed(nameClient, "client")
        if (!isNameUsed) {
            const resultClient = await postData("http://localhost:4000/postClients", Client)
            setResult(resultClient.result)
            setTimeout(() => {
                setResult()
            }, 3400);
            reload()
            resetAllData()
            return
        }
        setResult("name used")
        setTimeout(() => {
            setResult()
        }, 3400);
        close && reload()
        close && close()
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
    const inputClient = new inputClass(handleSubmit)
    return (
        <div className={Style.ContentForm}>
            <div className={Style.TittleForm}>
                <p>Crear Cliente</p>
            </div>
            <form className={Style.FormClient}>
                <div className={Style.DataInputs}>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Nombre Cliente</p>
                        </div>
                        {inputClient.getInput(nameClient, setNameClient)}
                    </div>
                    <div className={Style.InputDocument}>
                        <div className={Style.TypeDocument}>
                            <div className={Style.InputTittleDocument}>
                                <p>Tipo de documento</p>
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
                                        <MenuItem value={"Dni"}>Dni</MenuItem>
                                        <MenuItem value={"Cuit"}>Cuit</MenuItem>
                                        <MenuItem value={"Rump"}>Rump</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className={Style.NDocument}>
                            <div className={Style.InputTittleDocument}>
                                <p>N° documento</p>
                            </div>
                            <div className={Style.CustomInput}>
                                {inputClient.getInput(Document.value, (e) => handleChangeDocument(e, "value"))}
                            </div>
                        </div>
                    </div>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Codigo</p>
                        </div>
                        {inputClient.getInput(Key, setKey)}
                    </div>
                </div>
                <div className={Style.DataContacts}>
                    <div className={Style.ContentContacts}>
                        <p className={Style.TittleContacts}>Contactos</p>
                    </div>
                    <div>
                        {numberContacts.map((valorNumber, key) => (
                            <div className={Style.InputContact} key={key}>
                                <div className={Style.TypeDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Tipo de Contacto</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        {inputClient.getInput(Contacts[valorNumber].type, (e) => handleChangeContacts(e, valorNumber, "type"))}
                                    </div>
                                </div>
                                <div className={Style.ocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Contacto</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        {inputClient.getInput(Contacts[valorNumber].value, (e) => handleChangeContacts(e, valorNumber, "value"))}
                                    </div>
                                </div>
                            </div>
                        ))}
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