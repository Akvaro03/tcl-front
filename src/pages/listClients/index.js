import FilterClients from "../../components/list/listClientsComponent/filter";
import FormCreateClient from "../../components/forms/formCreateClient";
import ResponsiveAppBar from "../../components/navbar";
import ModalPortal from "../../components/modelPortal";
import AddIcon from "@mui/icons-material/Add";
import Style from "./listClients.module.css";
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import ListPrototype from "../../components/listPrototype";
import headerList from "../../classes/headerList";
import TableClients from "../../components/tables/TableClients";
import classToastList from "../../classes/classToastList";
import ToastList from "../../components/toastList";
import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";
import useListClients from "../../hooks/useListClients";

function ListClients() {
  const [isForm, setIsForm] = useState();
  const [toasts, setToasts] = useState([]);
  const { clients, reloadClients,filterClients } = useListClients();

  const message = (text) => {
    classToastList.addToast(setToasts, text);
  };
  return (
    <>
      <ResponsiveAppBar />
      <div className={Style.BodyCreateOt}>
        <FilterClients filterData={filterClients} />
        {clients && (
          <ListPrototype
            clickable={(data) => setIsForm(data)}
            Table={TableClients}
            list={clients}
            header={headerClients.getHeader()}
            height={"80%"}
          />
        )}
      </div>
      <Fab
        onClick={() => setIsForm(true)}
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: "40px", bottom: "60px", zIndex: 1 }}
      >
        <AddIcon />
      </Fab>
      {isForm && (
        <ModalPortal type={"form"}>
          <FormCreateClient
            message={message}
            close={setIsForm}
            reload={reloadClients}
            data={isForm === true ? false : isForm}
          />
        </ModalPortal>
      )}
      <ToastList listData={toasts} />
    </>
  );
}
const headerClients = new headerList();
headerClients.addHeader("ID", "10%");
headerClients.addHeader("Código", "20%");
headerClients.addHeader("Nombre", "30%");
headerClients.addHeader("Dirección", "50%");
export default ListClients;
