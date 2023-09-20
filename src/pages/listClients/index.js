import ListClientsComponent from "../../components/list/listClientsComponent";
import FilterClients from "../../components/list/listClientsComponent/filter";
import FormCreateClient from "../../components/forms/formCreateClient";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ResponsiveAppBar from "../../components/navbar";
import ModalPortal from "../../components/modelPortal";
import AddIcon from '@mui/icons-material/Add';
import Style from "./listClients.module.css"
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";

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
                    <ListClientsComponent Clients={clientsFiltered} />
                )}
            </div>
            <Fab onClick={() => setIsForm(true)} color="primary" aria-label="add" sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                <AddIcon />
            </Fab>
            {isForm && (
                <ModalPortal type={"form"}>
                    <FormCreateClient close={setIsForm} reload={reload} />
                </ModalPortal>
            )}
        </>
    );
}

export default ListClients;