import ListClientsComponent from "../../components/list/listClientsComponent";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ResponsiveAppBar from "../../components/navbar";
import ModalPortal from "../../components/modelPortal";
import AddIcon from '@mui/icons-material/Add';
import Style from "./listClients.module.css"
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import FormCreateClient from "../../components/forms/formCreateClient";
function ListClients() {
    const [clients, setClients] = useState()
    const [isForm, setIsForm] = useState()
    useEffect(() => {
        getDataFromUrl("http://localhost:4000/getClients")
            .then(data => setClients(data))
    }, [])
    const reload = () => {
        setTimeout(() => {
            getDataFromUrl("http://localhost:4000/getClients")
                .then(data => setClients(data))
        }, 1000);
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                {clients && (
                    <ListClientsComponent Clients={clients} />
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