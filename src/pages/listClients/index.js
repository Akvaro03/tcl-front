import FilterClients from "../../components/list/listClientsComponent/filter";
import FormCreateClient from "../../components/forms/formCreateClient";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ResponsiveAppBar from "../../components/navbar";
import ModalPortal from "../../components/modelPortal";
import AddIcon from '@mui/icons-material/Add';
import Style from "./listClients.module.css"
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import ListPrototype from "../../components/listPrototype";
import headerList from "../../classes/headerList";
import TableClients from "../../components/tables/TableClients";

function ListClients() {
    const [clients, setClients] = useState()
    const [clientsFiltered, setClientsFiltered] = useState()
    const [isForm, setIsForm] = useState()
    useEffect(() => {
        getDataFromUrl("/getClients")
            .then(data => {
                setClients(data)
                setClientsFiltered(data)
            })
    }, [])
    const reload = () => {
        setTimeout(() => {
            getDataFromUrl("/getClients")
                .then(data => {
                    setClients(data)
                    setClientsFiltered(data)
                })
        }, 1000);
    }
    const filterData = (value, type) => {
        if (type === "name") {
            setClientsFiltered(clients.filter(data => data.Name.toLowerCase().includes(value.toLowerCase())))
        } else {
            setClientsFiltered(clients.filter(data => data.KeyUnique.toLowerCase().includes(value.toLowerCase())))
        }
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <FilterClients filterData={filterData} />
                {clients && (
                    <ListPrototype clickable={(data) => setIsForm(data)} Table={TableClients} list={clientsFiltered} header={headerClients.getHeader()} height={"80%"} />
                )}
            </div>
            <Fab onClick={() => setIsForm(true)} color="primary" aria-label="add" sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                <AddIcon />
            </Fab>
            {isForm && (
                <ModalPortal type={"form"}>
                    <FormCreateClient close={setIsForm} reload={reload} data={isForm} />
                </ModalPortal>
            )}
        </>
    );
}
const headerClients = new headerList()
headerClients.addHeader("ID", "10%")
headerClients.addHeader("Código", "30%")
headerClients.addHeader("Nombre", "60%")
export default ListClients;