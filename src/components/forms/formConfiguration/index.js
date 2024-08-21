import inputClass from "../../../classes/inputClass";
import Style from "./formConfiguration.module.css";
import Upload from "../../../components/upload";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import FormPrototype from "../../formPrototype";
import useConfigurationHandle from "../../../hooks/useConfigurationHandle";
function FormConfiguration({ close, message }) {
    const { configData, handleConfiguration, saveConfiguration } = useConfigurationHandle(message,close)

    // const loadImage = () => {
    //     setResult("ok loadedImage")
    //     setTimeout(() => {
    //         setResult()
    //     }, 2000);
    // }
    const inputConfig = new inputClass(saveConfiguration)
    return (
        <FormPrototype close={close} tittle={"Configuracion"} width="70%">
            <div className={Style.formConfiguration}>
                <div className={Style.input}>
                    <div className={Style.inputTittle}>
                        <p>Nombre de la empresa:</p>
                    </div>
                    {inputConfig.getInput(configData.nameCompany, (e) => handleConfiguration(e, "nameCompany"))}
                </div>
                <div className={Style.input}>
                    <div className={Style.inputTittle}>
                        <p>Logo del navegador:</p>
                    </div>
                    <Box sx={{ width: "30%", height: "100%" }}>
                        <Upload data={configData.browserLogoFile} setFile={(e) => handleConfiguration(e, "browserLogoFile")} />
                    </Box>
                    <div className={Style.inputTittle}>
                        <p>Logo de la empresa:</p>
                    </div>
                    <Box sx={{ width: "30%", height: "100%" }}>
                        <Upload data={configData.companyLogoFile} setFile={(e) => handleConfiguration(e, "companyLogoFile")} />
                    </Box>
                </div>
                <div className={Style.buttons}>
                    <Button onClick={() => close()} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={saveConfiguration} variant="contained">
                        Guardar
                    </Button>
                </div>
            </div >
        </FormPrototype>
    );
}

export default FormConfiguration;