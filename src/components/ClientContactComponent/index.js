import Style from "./ClientContactComponent.module.css"

function ClientContactComponent({ contacts }) {
    if (!contacts | !contacts[0]) return ""

    console.log(contacts)
    return (
        contacts.map((contact, key) => (
            <div key={key} className={Style.displayContacts}>
                <p>Tipo:{contact.type}</p>
                <p>Contacto:{contact.contact}</p>
                <p>Email:{contact.email}</p>
                <p>Telefono:{contact.cell}</p>
            </div>
        ))
    );
}

export default ClientContactComponent;