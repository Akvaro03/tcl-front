import { useState } from "react";
import { default as editClientDb } from "../../db/editClient";
import addClient from "../../db/addClient";
import deleteClientDb from "../../db/deleteClient";

function useCreateClient(data, close, reload) {
  const [client, setClient] = useState({
    ...initialClient,
    ...data,
    Contacts: data ? JSON.parse(data.Contacts) : [],
    Document: data ? JSON.parse(data.Document) : { type: "", value: "" },
  });
  const editClient = (category, value) => {
    setClient((prev) => ({ ...prev, [category]: value }));
  };
  const resetClient = () => {
    setClient({
      ...initialClient,
      ...data,
      Document: data ? JSON.parse(data.Document) : { type: "", value: "" },
    });
  };
  const getClient = () => {
    if (!verifyClient()) return false;
    return {
      ...client,
      Document: JSON.stringify(client.Document),
      Contacts: JSON.stringify(filterContacts(client.Contacts)),
    };
  };

  const verifyClient = () => {
    if (3 > client.KeyUnique.length || client.KeyUnique.length > 4) {
      console.log("El codigo tiene que tener entre 3 a 4 caracteres");
      return false;
    }
    if (!client.Contacts[0]) {
      console.log(client.Contacts);
      return false;
    }
    if (client) {
      return false;
    }
    return Object.values(client).every(
      (valor) => valor !== undefined && valor !== null && valor !== ""
    );
  };

  const deleteClient = () => {
    deleteClientDb({ id: client.idEditable });
    close();
    reload();
  };

  const submitClient = () => {
    if (!verifyClient()) {
      return "missed data";
    }

    const clientFormatted = getClient();

    if (data) {
      const sameName = clientFormatted.Name === data.Name;
      const sameKey = clientFormatted.KeyUnique === data.KeyUnique;
      const sameIdEditable = clientFormatted.idEditable === data.idEditable;
      const dataToEdit = { ...clientFormatted, id: data.id };
      return editClientDb(dataToEdit, sameKey, sameName, sameIdEditable);
    }

    return addClient(clientFormatted);
  };

  return {
    client,
    deleteClient,
    editClient,
    resetClient,
    getClient,
    verifyClient,
    submitClient,
  };
}
const filterContacts = (Contacts) =>
  Contacts
    ? Contacts.filter((e) => e.type.length > 0 && e.contact.length > 0)
    : [];
const initialClient = {
  idEditable: "",
  Name: "",
  Document: { type: "", value: "" },
  KeyUnique: "",
  Contacts: [],
  location: "",
};
export default useCreateClient;
