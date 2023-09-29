import FormCreateActivity from "../../../../components/forms/formCreateActivity";
import FormConfiguration from "../../../../components/forms/formConfiguration";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormCreateType from "../../../../components/forms/formCreateType";
import ListActivity from "../../../../components/list/listActivity";
import ListTypes from "../../../../components/list/listTypes";
import ModalPortal from "../../../../components/modelPortal";
import Alerts from "../../../../components/alerts";
import { Box, Button } from "@mui/material";
import { useState } from "react";

function SelectConfig() {
    const [menssage, setMenssage] = useState()

    const [isFormActivity, setIsFormActivity] = useState()
    const [isFormConfig, setIsFormConfig] = useState()
    const [isFormType, setIsFormType] = useState()

    const [isListActivity, setIsListActivity] = useState()
    const [isListType, setIsListType] = useState()
    return (
        <>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: "70%", height: "50%", borderRadius: "25px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="text" onClick={() => setIsFormActivity(true)}>Nueva Actividad </Button>
                    <Button sx={{ color: "black" }} component={"div"} onClick={() => setIsListActivity(true)}><FormatListBulletedIcon /></Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="text" onClick={() => setIsFormType(true)}>Nuevo Tipo de OT</Button>
                    <Button sx={{ color: "black" }} component={"div"} onClick={() => setIsListType(true)}><FormatListBulletedIcon /></Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="text" onClick={() => setIsFormConfig(true)}>Configurar Aplicación</Button>
                </Box>
            </Box>
            {isFormActivity && (
                <ModalPortal type={"form"}>
                    <FormCreateActivity close={setIsFormActivity} menssage={setMenssage} />
                </ModalPortal>
            )}
            {isFormType && (
                <ModalPortal type={"form"}>
                    <FormCreateType close={setIsFormType} menssage={setMenssage} />
                </ModalPortal>
            )}
            {isFormConfig && (
                <ModalPortal type={"form"}>
                    <FormConfiguration close={setIsFormConfig} menssage={setMenssage} />
                </ModalPortal>
            )}




            {isListActivity && (
                <ModalPortal type={"form"}>
                    <ListActivity close={setIsListActivity} menssage={setMenssage} />
                </ModalPortal>
            )}
            {isListType && (
                <ModalPortal type={"form"}>
                    <ListTypes close={setIsListType} menssage={setMenssage} />
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

export default SelectConfig;