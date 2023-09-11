import { Button, Checkbox, FormControlLabel } from "@mui/material";
import getDataFromUrl from "../../../hooks/getDataFromUrl";
import inputClass from "../../../classes/inputClass";
import Style from "./formCreateType.module.css"
import { useEffect, useState } from "react";
import nameUsed from "../../../db/nameUsed";
import postData from "../../../db/postData";

function FormCreateType({ close, menssage, data }) {
    const [activity, setActivity] = useState({})
    const [name, setName] = useState(data ? data.nameType : "")
    const [abbr, setAbbr] = useState(data ? data.abbreviation : "")
    useEffect(() => {
        searchAndSet()
    }, [])
    const saveTypeOt = async () => {
        const activitiesCopy = activity.filter((data) => data.select === true).map(({ select, ...rest }) => rest);
        if (!name || !activitiesCopy[0] || !abbr) {
            menssage("missed data")
            setTimeout(() => {
                menssage()
            }, 3000);
            return
        }
        const isNameUsed = await nameUsed(name, "typeOT")
        if (!isNameUsed) {
            menssage(postData("http://localhost:4000/postTypeOt", { nameType: name.trim(), activities: activitiesCopy, abbr }))
            searchAndSet()
            return
        }
        menssage("name used")
        setTimeout(() => {
            menssage()
        }, 3000);
    }

    const handleState = (user, checked) => {
        const copy = activity.map(activityUser => {
            if (activityUser === user) {
                return { ...activityUser, select: checked };
            }
            return activityUser;
        });
        setActivity(copy);
    };
    const searchAndSet = () => {
        getDataFromUrl("http://localhost:4000/getActivities")
            .then(data => {
                data.forEach(item => {
                    item.select = false;
                });
                return data;
            })
            .then(data => setActivity(data));
        setAbbr("");
        setName("");
    }
    const inputType = new inputClass(saveTypeOt)
    return (
        <div className={Style.FormCreateType}>
            <div className={Style.TittleForm}>
                <h1>{data ? "Editar tipo de OT" : "Crear nuevo tipo de OT"}</h1>
            </div>
            <div className={Style.ContentForm}>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Tipo de OT
                    </p>
                    <div className={Style.input}>
                        {inputType.getInput(name, setName)}
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Abreviacion
                    </p>
                    <div className={Style.input}>
                        {inputType.getInput(abbr, setAbbr)}
                    </div>
                </div>
                <div>
                    {activity[0] && (
                        activity.map((user, key) => (
                            <div key={key}>
                                <FormControlLabel
                                    control={<Checkbox checked={user.select}
                                        onChange={({ target: { checked } }) => { handleState(user, checked) }} />} label={user.name} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className={Style.buttonSave}>
                <Button variant="outlined" onClick={() => close()}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={saveTypeOt}>
                    Guardar tipo de OT
                </Button>
            </div>
        </div>
    );
}
export default FormCreateType;