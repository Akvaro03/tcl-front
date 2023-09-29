import deleteActivity from "../../../db/deleteActivity";
import { Box, Button, Checkbox } from "@mui/material";
import inputClass from "../../../classes/inputClass";
import DeleteIcon from '@mui/icons-material/Delete';
import editActivity from "../../../db/editActivity";
import addActivity from "../../../db/addActivity";
import nameUsed from "../../../db/nameUsed";
import Style from "./formCreate.module.css";
import { useEffect, useRef, useState } from "react";
import { closeEsc } from "../../../hooks/closeEsc";
function FormCreateActivity({ close, menssage, data, reload }) {
    const divRef = useRef(null);

    const [emit, setEmit] = useState(data ? data.emit === 1 ? true : false : false)
    const [score, setScore] = useState(data ? data.score : "")
    const [name, setName] = useState(data ? data.name : "")
    const [time, setTime] = useState(data ? data.time : "")
    useEffect(() => {

        const divElement = divRef.current;
        if (divElement) {
            divElement.addEventListener('keydown', e => closeEsc(e, close));
        }
        return () => {
            divElement.removeEventListener('keydown', closeEsc);
        };
    }, [close])

    const onSave = async () => {
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
                menssage(addActivity({ name, score, time, emit }))
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
    const onDelete = () => {
        deleteActivity({ id: data.id })
    }
    const inputActivity = new inputClass(onSave)
    return (
        <Box ref={divRef} tabIndex={0} component={"div"} sx={{ background: "white", alignItems: "center", flexDirection: "column", display: "flex", boxShadow: "rgba(19, 21, 22, 0.35) 0px 5px 15px", width: "30%", height: "40%", borderRadius: "15px" }}>
            <Box component={"div"} sx={{ fontWeight: "bold", fontSize: "20px", width: "100%", marginBottom: "5px", marginTop: "30px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Box></Box>
                {data ? "Editar Actividad" : "Nueva Actividad"}
                {data ? <Button onClick={onDelete} sx={{ color: "black" }}><DeleteIcon /></Button> : <Box></Box>}
            </Box>
            <div className={Style.form}>
                <div className={Style.inputFormContent}>
                    <div className={Style.input}>
                        <Checkbox checked={emit} onChange={({ target: { checked } }) => { setEmit(checked) }} />
                    </div>
                    <p className={Style.TittleInput}>
                        Se emite informe
                    </p>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tipo de actividad: 
                    </p>
                    <div className={Style.input}>
                        {inputActivity.getInput(name, setName)}
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Puntaje:
                    </p>
                    <div className={Style.input}>
                        {inputActivity.getInput(score, setScore)}
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Duración estimada (días):
                    </p>
                    <div className={Style.input}>
                        {inputActivity.getInput(time, setTime)}
                    </div>
                </div>
               
            </div>
            <div className={Style.buttonSave}>
                <Button variant="outlined" onClick={() => close()}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={onSave}>
                    Guardar Actividad
                </Button>
            </div>
        </Box>
    );
}

export default FormCreateActivity;