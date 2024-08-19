import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import inputClass from '../../../classes/inputClass';
import Style from './formCreateClient.module.css';
import FormPrototype from '../../formPrototype';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useCreateClient from '../../../hooks/useCreateClient';
import AddContact from '../../addContact';

function FormCreateClient({ close, reload, data, message }) {
    const { client, submitClient, editClient, resetClient } = useCreateClient(data)
    const [addContact, setAddContact] = useState(false)

    const handleSubmit = async () => {
        let resultClient = await submitClient();
        console.log(resultClient)
        message(resultClient)
        if (resultClient !== "name used" && resultClient !== "id used" && resultClient !== "missed data") {
            console.log("entro")
            close && reload()
            close && close()
            reload()
            resetClient()
        }
        return
    };

    const inputClient = new inputClass(handleSubmit)
    return (
        <FormPrototype close={close} tittle={data ? "Editar Cliente" : "Crear Cliente"} width='60%' >
            <form className={Style.FormClient}>
                <div className={Style.DataInputs}>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Id:</p>
                        </div>
                        {inputClient.getInput(client.idEditable, (value) => editClient("idEditable", value))}
                    </div>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Nombre:</p>
                        </div>
                        {inputClient.getInput(client.Name, (value) => editClient("Name", value))}
                    </div>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Código:</p>
                        </div>
                        {inputClient.getInput(client.KeyUnique, (value) => editClient("KeyUnique", value))}
                    </div>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Dirección:</p>
                        </div>
                        {inputClient.getInput(client.location, (value) => editClient("location", value))}
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
                                        value={client.Document.type}
                                        onChange={(e) => editClient("Document", { ...client.Document, type: e.target.value })}
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
                                {inputClient.getInput(client.Document.value, (value) => editClient("Document", { ...client.Document, value }))}
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={() => setAddContact(prev => !prev)} variant='outlined' sx={{ borderRadius: "15px" }}>
                    <div>
                        <AddIcon />
                    </div>
                    <p>
                        Agregar contactos 
                    </p>
                    <p>
                        {` (${client?.Contacts?.length})`}
                    </p>
                </Button>
                <div className={Style.ButtonSave}>
                    {close && (
                        <Button onClick={() => close(false)} variant="outlined">Cancel</Button>
                    )}
                    <Button onClick={handleSubmit} variant="contained">Guardar</Button>

                </div>
            </form>
            {addContact && (
                <AddContact close={setAddContact} save={(e) => editClient("Contacts", e)} prevContacts={client.Contacts} />
            )}
        </FormPrototype>
    );
}

export default FormCreateClient;