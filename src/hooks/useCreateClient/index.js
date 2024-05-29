import { useState } from "react";

function useCreateClient(data) {
    const [client, setClient] = useState({ ...initialClient, ...data, Contacts: data ? JSON.parse(data.Contacts) : [], Document: data ? JSON.parse(data.Document) : { type: '', value: '' } })
    const editClient = (category, value) => {
        setClient(prev => ({ ...prev, [category]: value }))
    }
    const resetClient = () => {
        setClient({ ...initialClient, ...data, Document: data ? JSON.parse(data.Document) : { type: '', value: '' } })
    }
    const getClient = () => {
        if (!verifyClient()) return false
        return { ...client, Document: JSON.stringify(client.Document), Contacts: JSON.stringify(filterContacts(client.Contacts)) }
    }

    const verifyClient = () => {
        return Object.values(client).every(valor => valor !== undefined && valor !== null && valor !== '');
    }

    return { client, editClient, resetClient, getClient, verifyClient }
}
const filterContacts = (Contacts) => Contacts ? Contacts.filter(e => (
    e.type.length > 0 && e.contact.length > 0
)) : []
const initialClient = {
    "idEditable": "",
    "Name": "",
    "Document": { type: '', value: '' },
    "KeyUnique": "",
    "Contacts": null,
    "location": ""
}
export default useCreateClient;