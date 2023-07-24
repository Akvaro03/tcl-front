import { Box, Button } from "@mui/material";
import { useState } from "react";
import ModuleConfiguration from "../moduleConfiguration";
import ModalPortal from "../../../../components/modelPortal";
import FormCreateActivity from "../../../../components/forms/formCreateActivity";
import FormCreateType from "../../../../components/forms/formCreateType";

function SelectConfig() {
    const [isFormActivity, setIsFormActivity] = useState()
    const [isFormConfig, setIsFormConfig] = useState()
    const [isFormType, setIsFormType] = useState()
    return (
        <>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: "50%", height: "50%", borderRadius: "25px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                <Button variant="text" onClick={() => setIsFormActivity(true)}>Añadir Actividad</Button>
                <Button variant="text" onClick={() => setIsFormType(true)}>Añadir Tipo</Button>
                <Button variant="text" onClick={() => setIsFormConfig(true)}>Configurar Aplicación</Button>
            </Box>
            {isFormActivity && (
                <ModalPortal type={"form"}>
                    <FormCreateActivity close={setIsFormActivity} />
                </ModalPortal>
            )}
            {isFormType && (
                <ModalPortal type={"form"}>
                    <FormCreateType close={setIsFormType} />
                </ModalPortal>
            )}
            {isFormConfig && (
                <ModalPortal type={"form"}>
                    <ModuleConfiguration close={setIsFormConfig} />
                </ModalPortal>
            )}
        </>
    );
}

export default SelectConfig;