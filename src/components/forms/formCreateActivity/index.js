import { Box, Button, Checkbox } from "@mui/material";
import Style from "./formCreate.module.css"
import { useState } from "react";
import nameUsed from "../../../db/nameUsed";
import InputMui from "../../inputMui";
import ModalPortal from "../../modelPortal";
import Alerts from "../../alerts";
import postData from "../../../db/postData";
function FormCreateActivity({ close }) {
    const [name, setName] = useState("")
    const [score, setScore] = useState("")
    const [time, setTime] = useState("")
    const [emit, setEmit] = useState(false)
    const [msg, setMsg] = useState()
    const saveActivities = async () => {
        if (!name || !score || !time) {
            setMsg("missed data")
            setTimeout(() => {
                setMsg()
            }, 4000);
            return
        }
        const isNameUsed = await nameUsed(name, "activity")
        if (!isNameUsed) {
            setMsg(postData("http://localhost:4000/postActivity", { name, score, time, emit }))
            return
        }
        setMsg("name used")
        setTimeout(() => {
            setMsg()
        }, 3000);
    }
    return (
        <Box component={"div"} sx={{ background: "white", alignItems: "center", flexDirection: "column", display: "flex", boxShadow: "rgba(19, 21, 22, 0.35) 0px 5px 15px", width: "80%", height: "50%", borderRadius: "15px" }}>
            <Box component={"div"} sx={{ fontWeight: 600, fontSize: "20px", width: "100%", height: "20%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                Crear nueva actividad
            </Box>
            <div className={Style.form}>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tipo de actividad
                    </p>
                    <div className={Style.input}>
                        <InputMui value={name} onChange={setName} />
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Score
                    </p>
                    <div className={Style.input}>
                        <InputMui value={score} onChange={setScore} />
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tiempo estimado
                    </p>
                    <div className={Style.input}>
                        <InputMui value={time} onChange={setTime} />
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
                    Guardar tipo de OT
                </Button>
            </div>
            {msg && (
                <ModalPortal type={"alert"} >
                    <Alerts Result={msg} />
                </ModalPortal>
            )}
        </Box>
    );
}

export default FormCreateActivity;