import { useState } from "react";
import InputMui from "../../../../components/inputMui";
import Style from "./formCreateType.module.css"
import PathTypeOt from "../pathTypeOt";
import { Button } from "@mui/material";
import postData from "../../../../hooks/postData";

function FormCreateType() {
    const [nameType, setNameType] = useState("")
    const [newPath, setNewPath] = useState(null)
    const [score, setScore] = useState("")
    const savePath = () => {
        const TypeOt = {
            score,
            nameType,
        }
        postData("http://localhost:4000/postTypeOt", { TypeOt, path: newPath })
    }
    return (
        <div className={Style.FormCreateType}>
            <div className={Style.TittleForm}>
                <h1>Crear nuevo tipo de Ot</h1>
            </div>
            <div className={Style.ContentForm}>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tipo de OT
                    </p>
                    <div className={Style.input}>
                        <InputMui value={nameType} onChange={setNameType} />
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Score al completar
                    </p>
                    <div className={Style.inputSmall}>
                        <InputMui value={score} onChange={setScore} />
                    </div>
                </div>
            </div>
            <div className={Style.TittleForm}>
                <h1>Path del Ot</h1>
            </div>
            <div className={Style.PathTypeOt}>
                <PathTypeOt newPath={newPath} setNewPath={setNewPath} />
            </div>
            <div className={Style.buttonSave}>
                <Button variant="contained" onClick={savePath}>
                    Guardar tipo de OT
                </Button>
            </div>
        </div>
    );
}

export default FormCreateType;