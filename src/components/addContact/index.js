import { Box, Button } from "@mui/material"
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import Style from './addContact.module.css';
import BackspaceIcon from '@mui/icons-material/Backspace';
import toUppercase from "../../hooks/toUppercase";
import inputClass from "../../classes/inputClass";
import ModalPortal from "../modelPortal";
import FormPrototype from "../formPrototype";
export default function AddContact({ close, save, prevContacts }) {
    const [Contacts, setContacts] = useState(prevContacts ? prevContacts : [{ ...formatContact }]);

    const handleChangeContacts = (e, number, type) => {
        let copy = [...Contacts]
        copy[number][type] = type === "type" && e ? toUppercase(e) : e;
        setContacts(copy)
    };
    const addContact = () => {
        setContacts(prev => [...prev, { ...formatContact }])
    }
    const deleteContact = (data) => {
        setContacts(prevContacts =>
            prevContacts.filter(prevContacts => prevContacts.type !== data.type && prevContacts.contact !== data.contact && prevContacts.email !== data.email && prevContacts.email !== data.email))
    }
    const inputClient = new inputClass(save)
    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={close} tittle={"Agregar contactos"} width="70%">
                <Box display={"flex"} height={"40%"} width={"90%"} flexDirection={"column"}>
                    <Box>
                        {Contacts.map((data, key) => (
                            <div className={Style.InputContact} key={key}>
                                <div className={Style.NDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Tipo:</p>
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
                                        {inputClient.getInput(data.contact, (e) => handleChangeContacts(e, key, "contact"))}
                                    </div>
                                </div>
                                <div className={Style.NDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Email:</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        {inputClient.getInput(data.email, (e) => handleChangeContacts(e, key, "email"))}
                                    </div>
                                </div>
                                <div className={Style.NDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Telefono:</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        {inputClient.getInput(data.cell, (e) => handleChangeContacts(e, key, "cell"))}
                                    </div>
                                </div>
                                <BackspaceIcon onClick={() => deleteContact(data)} />
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
        </ModalPortal>
    )
}

const formatContact = { type: "", contact: "", email: "", cell: "" }