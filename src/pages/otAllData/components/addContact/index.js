import { Box, Button } from "@mui/material"
import inputClass from "../../../../classes/inputClass"
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import Style from './addContact.module.css';
import FormPrototype from "../../../../components/formPrototype";
import toUppercase from "../../../../hooks/toUppercase";

export default function AddContact({ close, save, prevContacts }) {
    const [Contacts, setContacts] = useState(prevContacts ? prevContacts : [{ type: "", value: "" }]);

    const handleChangeContacts = (e, number, type) => {
        let copy = [...Contacts]
        copy[number][type] = type === "type" && e ? toUppercase(e) : e;
        setContacts(copy)
    };
    const addContact = () => {
        setContacts(prev => [...prev, { type: "", value: "" }])
    }
    const inputClient = new inputClass(save)
    return (
        <FormPrototype close={close} tittle={"Agregar contactos"}>
            <Box display={"flex"} height={"40%"} width={"90%"} flexDirection={"column"}>
                <Box>
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
                </Box>
                <Button onClick={() => addContact()} variant='outlined' sx={{ borderRadius: "15px", margin: "15px 0" }}>
                    <div>
                        <AddIcon />
                    </div>
                    <p>
                        Agregar Contacto
                    </p>
                </Button>
            </Box>
            <Box margin={"15px 0"} height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                <Button size="small" variant="outlined" onClick={() => close(false)}>Cerrar</Button>
                <Button size="large" variant="contained" onClick={() => save(Contacts)}>Guardar</Button>
            </Box>
        </FormPrototype>
    )
}