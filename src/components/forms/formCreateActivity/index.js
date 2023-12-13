import deleteActivity from "../../../db/deleteActivity";
import inputClass from "../../../classes/inputClass";
import editActivity from "../../../db/editActivity";
import addActivity from "../../../db/addActivity";
import FormPrototype from "../../formPrototype";
import nameUsed from "../../../db/nameUsed";
import Style from "./formCreate.module.css";
import { Button } from "@mui/material";
import { useState } from "react";
function FormCreateActivity({ close, menssage, data, reload }) {
    const [score, setScore] = useState(data ? data.score : "")
    const [name, setName] = useState(data ? data.name : "")
    const [time, setTime] = useState(data ? data.time : "")
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
                editActivity({ name, score, time, id: data.id })
                    .then((result) => menssage(result))
            } else {
                addActivity({ name, score, time })
                    .then((result) => menssage(result))
            }
            reload && reload()
            setTimeout(() => {
                menssage()
            }, 1500);
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
        reload()
        close()
    }
    const inputActivity = new inputClass(onSave)
    return (
        <FormPrototype close={close} tittle={data ? "Editar Actividad" : "Nueva Actividad"} onDelete={data && onDelete}>
            <div className={Style.form}>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tipo de actividad:
                    </p>
                    <div className={Style.input}>
                        {inputActivity.getInput(name, (string => setName(string.toUpperCase())))}
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
        </FormPrototype>
    );
}

export default FormCreateActivity;