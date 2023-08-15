import { Box, Button, Checkbox } from "@mui/material";
import postData from "../../../db/postData";
import Style from "./formCreate.module.css"
import nameUsed from "../../../db/nameUsed";
import InputMui from "../../inputMui";
import { useState } from "react";
import editActivity from "../../../db/editActivity";
function FormCreateActivity({ close, menssage, data, reload }) {
    const [emit, setEmit] = useState(data ? data.emit === 1 ? true : false : false)
    const [score, setScore] = useState(data ? data.score : "")
    const [name, setName] = useState(data ? data.name : "")
    const [time, setTime] = useState(data ? data.time : "")

    const saveActivities = async () => {
        if (!name || !score || !time) {
            menssage("missed data")
            setTimeout(() => {
                menssage()
            }, 4000);
            return
        }
        const isNameUsed = await nameUsed(name, "activity")
        if (!isNameUsed || data) {
            if (data) {
                editActivity({ name, score, time, emit, id: data.id })
            } else {
                menssage(postData("http://localhost:4000/postActivity", { name, score, time, emit }))
            }
            reload()
            close()
            return
        }
        menssage("name used")
        setTimeout(() => {
            menssage()
        }, 3000);
    }
    return (
        <Box component={"div"} sx={{ background: "white", alignItems: "center", flexDirection: "column", display: "flex", boxShadow: "rgba(19, 21, 22, 0.35) 0px 5px 15px", width: "80%", height: "50%", borderRadius: "15px" }}>
            <Box component={"div"} sx={{ fontWeight: 600, fontSize: "20px", width: "100%", height: "20%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                {data ? "Editar Actividad" : "Crear nueva actividad"}
            </Box>
            <div className={Style.form}>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tipo de actividad
                    </p>
                    <div className={Style.input}>
                        <InputMui value={name} onChange={setName} sendData={saveActivities} />
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Score
                    </p>
                    <div className={Style.input}>
                        <InputMui value={score} onChange={setScore} sendData={saveActivities} />
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tiempo estimado
                    </p>
                    <div className={Style.input}>
                        <InputMui value={time} onChange={setTime} sendData={saveActivities} />
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Se emite?
                    </p>
                    <div className={Style.input}>
                        <Checkbox checked={emit}
                            onChange={({ target: { checked } }) => { setEmit(checked) }} />
                    </div>
                </div>
            </div>
            <div className={Style.buttonSave}>
                <Button variant="outlined" onClick={() => close()}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={saveActivities}>
                    Guardar actividad
                </Button>
            </div>
        </Box>
    );
}

export default FormCreateActivity;