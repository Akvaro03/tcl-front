import { useEffect, useState } from "react";
import fetchAsyncUrl from "../fetchAsyncUrl";

function useListClients() {
  const [clientData, setClientData] = useState();
  const [clients, setClients] = useState();
  const [reload, setReload] = useState(false);

  const reloadClients = () => {
    setTimeout(() => {
      setReload((prev) => !prev);
    }, 500);
  };

  useEffect(() => {
    fetchAsyncUrl("/getClients")
      .then((data) =>
        data.sort((a, b) => (a.idEditable > b.idEditable ? 1 : -1))
      )
      .then((data) => {
        setClientData(data);
        setClients(data);
      });
  }, [reload]);

  const filterClients = (value, type) => {
    if (type === "id") {
      setClients(
        clientData.filter((data) =>
          String(data.idEditable).includes(String(value))
        )
      );
    }
    if (type === "name") {
      setClients(
        clientData.filter((data) =>
          data.Name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    if (type === "code") {
      setClients(
        clientData.filter((data) =>
          data.KeyUnique.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return { clients, reloadClients, filterClients };
}

export default useListClients;
