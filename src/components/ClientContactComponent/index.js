import { useState } from "react";
import permissions from "../../classes/permissions";
import Style from "./ClientContactComponent.module.css"
import { Button } from "@mui/material";
import getUser from "../../hooks/getUser";
import AddContact from "../addContact";

function ClientContactComponent({ contacts, saveChanges }) {
    const [addContact, setAddContact] = useState(false)
    const rol = getUser("roles")

    if (!contacts | !contacts[0]) return (
        <>
            {permissions.editActv(rol) && (
                <Button size="small" variant="outlined"
                    onClick={() => setAddContact(true)}>Agregar contacto</Button>
            )}
            {addContact && (
                <AddContact close={setAddContact} save={saveChanges} prevContacts={contacts} />
            )}
        </>
    )

    return (
        <>
            {contacts.map((contact, key) => (
                <div key={key} className={Style.displayContacts} onClick={setAddContact}>
                    <div>
                        <span className={Style.tittleContact}>Tipo:</span>{contact.type}
                    </div>
                    <div>
                        <span className={Style.tittleContact}>Contacto:</span>{contact.contact}
                    </div>
                    <div>
                        <span className={Style.tittleContact}>Email:</span>{contact.email}
                    </div>
                    <div>
                        <span className={Style.tittleContact}>Telefono:</span>{contact.cell}
                    </div>
                </div>
            ))}
            {addContact && (
                <AddContact close={setAddContact} save={saveChanges} prevContacts={contacts} />
            )}
        </>
    );
}

export default ClientContactComponent;