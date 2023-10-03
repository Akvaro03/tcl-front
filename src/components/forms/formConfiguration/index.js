import getDataFromUrl from "../../../hooks/getDataFromUrl";
import ModalPortal from "../../../components/modelPortal";
import inputClass from "../../../classes/inputClass";
import { useEffect, useRef, useState } from "react";
import { closeEsc } from "../../../hooks/closeEsc";
import Style from "./formConfiguration.module.css";
import Upload from "../../../components/upload";
import Alerts from "../../../components/alerts";
import Button from '@mui/material/Button';
import getIp from "../../../hooks/getIp";
import { Box } from "@mui/material";
import axios from 'axios';
function FormConfiguration({ close, menssage }) {
    const divRef = useRef(null);
    const [result, setResult] = useState()

    const [nameCompany, setnameCompany] = useState("")
    const [browserLogo, setBrowserLogo] = useState("")
    const [companyLogo, setCompanyLogo] = useState("")

    const [browserLogoFile, setBrowserLogoFile] = useState("")
    const [companyLogoFile, setCompanyLogoFile] = useState("")

    useEffect(() => {
        getDataFromUrl("/getConfig")
            .then(data => setnameCompany(data))
        setBrowserLogo(`${getIp()}:4000/getBrowserLogo`)
        setCompanyLogo(`${getIp()}:4000/getCompanyLogo`)
        const divElement = divRef.current;
        if (divElement) {
            divElement.addEventListener('keydown', e => closeEsc(e, close));
        }
        return () => {
            divElement.removeEventListener('keydown', closeEsc);
        };

    }, [close])

    const handleSaveConfig = async () => {
        if (!nameCompany || !browserLogo || !companyLogo) {
            menssage("missed data")
            setTimeout(() => {
                menssage()
            }, 3000);
            return
        }
        let formData = new FormData();
        formData.append('browserLogo', browserLogoFile)
        formData.append('companyLogo', companyLogoFile)
        formData.append('nameCompany', nameCompany)
        try {
            await axios.post('http://localhost:4000/postConfig', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(({ data }) => data.result).then(data => {
                setResult(data)
                setTimeout(() => {
                    setResult()
                }, 3000);
            });

        } catch (error) {
            console.log(error);
        }
    }
    const loadImage = () => {
        setResult("ok loadedImage")
        setTimeout(() => {
            setResult()
        }, 2000);
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
                        <p>Nombre de la empresa:</p>
                    </div>
                    {inputConfig.getInput(nameCompany, setnameCompany)}
                </div>
                <div className={Style.input}>
                    <div className={Style.inputTittle}>
                        <p>Logo del navegador:</p>
                    </div>
                    <Box sx={{ width: "30%", height: "100%" }}>
                        <Upload data={browserLogo} loadImage={loadImage} setData={setBrowserLogo} setFile={setBrowserLogoFile} />
                    </Box>
                    <div className={Style.inputTittle}>
                        <p>Logo de la empresa:</p>
                    </div>
                    <Box sx={{ width: "30%", height: "100%" }}>
                        <Upload data={companyLogo} loadImage={loadImage} setData={setCompanyLogo} setFile={setCompanyLogoFile} />
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
            {result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={result} />
                </ModalPortal>
            )}
        </div >
    );
}

export default FormConfiguration;