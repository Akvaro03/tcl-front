import getDataFromUrl from "../../../hooks/getDataFromUrl";
import inputClass from "../../../classes/inputClass";
import Style from "./moduleConfiguration.module.css"
import Upload from "../../../components/upload";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
function ModuleConfiguration({ close, menssage }) {
    const [nameCompany, setnameCompany] = useState("")
    const [browserLogo, setBrowserLogo] = useState("")
    const [companyLogo, setCompanyLogo] = useState("")
    useEffect(() => {
        getDataFromUrl("http://localhost:4000/getConfig").then(data => setnameCompany(data))
        setBrowserLogo('http://localhost:4000/getBrowserLogo')
        setCompanyLogo('http://localhost:4000/getCompanyLogo')
    }, [])

    const handleSaveConfig = async () => {
        if (!nameCompany || !browserLogo || !companyLogo) {
            menssage("missed data")
            setTimeout(() => {
                menssage()
            }, 3000);
            return
        }
        const formData = new FormData();
        formData.append('file', browserLogo)
        formData.append('file', companyLogo)
        formData.append('nameCompany', nameCompany)
        try {
            await axios.post('http://localhost:4000/postConfig', formData, {
                image_name: "image_name",
                description: "image_description"
            })
        } catch (error) {
            console.log(error);
        }
    }
    const inputConfig = new inputClass(handleSaveConfig)
    return (
        <div className={Style.ContentConfiguration}>
            <div className={Style.tittlePage}>
                <h1>Configuración</h1>
            </div>
            <div className={Style.formConfiguration}>
                <div className={Style.input}>
                    <div className={Style.inputTittle}>
                        <p>Nombre de la empresa</p>
                    </div>
                    {inputConfig.getInput(nameCompany, setnameCompany)}
                </div>
                <div className={Style.input}>
                    <div className={Style.inputTittle}>
                        <p>Logo del navegador</p>
                    </div>
                    <Box sx={{ width: "30%", height: "100%" }}>
                        <Upload data={browserLogo} setData={setBrowserLogo} />
                    </Box>

                    <div className={Style.inputTittle}>
                        <p>Logo de la empresa</p>
                    </div>
                    <Box sx={{ width: "30%", height: "100%" }}>
                        <Upload data={companyLogo} setData={setCompanyLogo} />
                    </Box>
                </div>
                <div className={Style.buttons}>
                    <Button onClick={() => close()} variant="outlined" color="success">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveConfig} variant="contained" color="success">
                        Guardar
                    </Button>
                </div>
            </div >
        </div >
    );
}

export default ModuleConfiguration;