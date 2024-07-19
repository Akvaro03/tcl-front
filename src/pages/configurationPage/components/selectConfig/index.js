import FormCreateActivity from "../../../../components/forms/formCreateActivity";
import FormConfiguration from "../../../../components/forms/formConfiguration";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormCreateType from "../../../../components/forms/formCreateType";
import TableActivity from "../../../../components/tables/TableActivity";
import ListPrototype from "../../../../components/listPrototype";
import ModalPortal from "../../../../components/modelPortal";
import headerList from "../../../../classes/headerList";
import Alerts from "../../../../components/alerts";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import TableType from "../../../../components/tables/TableTypes";
import fetchAsyncUrl from "../../../../hooks/fetchAsyncUrl";
import FormCreateContract from "../../../../components/formCreateContract";

function SelectConfig() {
    const [menssage, setMenssage] = useState()

    const [isFormActivity, setIsFormActivity] = useState()
    const [isFormConfig, setIsFormConfig] = useState()
    const [isFormType, setIsFormType] = useState()
    const [isFormContract, setIsFormContract] = useState()

    const [isListActivity, setIsListActivity] = useState()
    const [isListType, setIsListType] = useState()

    const [activities, setActivities] = useState([])
    const [types, setTypes] = useState([])
    useEffect(() => {
        getActivities()
        getTypes()
    }, [])
    const getActivities = (wait) => {
        if (wait) {
            setTimeout(() => {
                fetchAsyncUrl("/getActivities")
                    .then(activities => setActivities(activities))
            }, 1000);
        }
        fetchAsyncUrl("/getActivities")
            .then(activities => setActivities(activities))
    }
    const getTypes = (wait) => {
        if (wait) {
            setTimeout(() => {
                fetchAsyncUrl("/getTypeOt")
                    .then(activities => setTypes(activities))
            }, 1000);
        }
        fetchAsyncUrl("/getTypeOt")
            .then(type => setTypes(type))
    }
    return (
        <>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: "70%", height: "50%", borderRadius: "25px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outlined" onClick={() => setIsFormContract(true)}>Nuevo contrato</Button>
                    <Button sx={{ color: "black" }} onClick={() => setIsListActivity(true)}><FormatListBulletedIcon /></Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outlined" onClick={() => setIsFormActivity(true)}>Nueva Actividad</Button>
                    <Button sx={{ color: "black" }} onClick={() => setIsListActivity(true)}><FormatListBulletedIcon /></Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outlined" onClick={() => setIsFormType(true)}>Nuevo Tipo de OT</Button>
                    <Button sx={{ color: "black" }} onClick={() => setIsListType(true)}><FormatListBulletedIcon /></Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="text" onClick={() => setIsFormConfig(true)}>Configurar Aplicación</Button>
                </Box>
            </Box>

            {isFormActivity && (
                <ModalPortal type={"form"}>
                    <FormCreateActivity reload={() => getActivities(true)} data={isFormActivity === true ? false : isFormActivity} close={setIsFormActivity} menssage={setMenssage} />
                </ModalPortal>
            )}
            {isFormType && (
                <ModalPortal type={"form"}>
                    <FormCreateType reload={() => getTypes(true)} data={isFormType === true ? false : isFormType} close={setIsFormType} menssage={setMenssage} />
                </ModalPortal>
            )}
            {isFormContract && (
                <ModalPortal type={"form"}>
                    <FormCreateContract close={setIsFormContract} />
                </ModalPortal>
            )}
            {isFormConfig && (
                <ModalPortal type={"form"}>
                    <FormConfiguration close={setIsFormConfig} menssage={setMenssage} />
                </ModalPortal>
            )}




            {isListActivity && (
                <ModalPortal type={"form"}>
                    <ListPrototype
                        header={headerActivity.getHeader()}
                        Table={TableActivity}
                        clickable={setIsFormActivity}
                        list={activities}
                        height={"80%"}
                        close={setIsListActivity}
                    />
                </ModalPortal>
            )}
            {isListType && (
                <ModalPortal type={"form"}>
                    <ListPrototype
                        header={headerTypes.getHeader()}
                        Table={TableType}
                        clickable={setIsFormType}
                        list={types}
                        height={"80%"}
                        close={setIsListType}
                    />
                </ModalPortal>
            )}

            {menssage && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={menssage} />
                </ModalPortal>
            )}
        </>
    );
}
const headerActivity = new headerList()
headerActivity.addHeader("Nombre", "30%")
headerActivity.addHeader("Puntuación", "30%")
headerActivity.addHeader("Duración estimada(días)", "30%")

const headerTypes = new headerList()
headerTypes.addHeader("Nombre", "20%")
headerTypes.addHeader("Identificador", "20%")
headerTypes.addHeader("Actividades por defecto", "40%")

export default SelectConfig;