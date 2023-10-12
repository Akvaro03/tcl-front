import deleteActivity from "../../../db/deleteActivity";
import inputClass from "../../../classes/inputClass";
import editActivity from "../../../db/editActivity";
import addActivity from "../../../db/addActivity";
import { Button, Checkbox } from "@mui/material";
import FormPrototype from "../../formPrototype";
import nameUsed from "../../../db/nameUsed";
import Style from "./formCreate.module.css";
import { useState } from "react";
function FormCreateActivity({ close, menssage, data, reload }) {

    const [emit, setEmit] = useState(data ? data.emit === 1 ? true : false : false)
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
        <FormPrototype close={close} tittle={data ? "Editar Actividad" : "Nueva Actividad"} onDelete={data && onDelete}>
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
        </FormPrototype>
    );
}

export default FormCreateActivity;