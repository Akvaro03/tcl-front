import { useEffect, useState } from "react";
import Style from "./formCreateType.module.css"
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import nameUsed from "../../../db/nameUsed";
import getDataFromUrl from "../../../hooks/getDataFromUrl";
import InputMui from "../../inputMui";
import ModalPortal from "../../modelPortal";
import Alerts from "../../alerts";
import postData from "../../../db/postData";

function FormCreateType({ close }) {
    const [nameType, setNameType] = useState("")
    const [activity, setActivity] = useState({})
    const [result, setResult] = useState()
    useEffect(() => {
        searchAndSet()
    }, [])
    const saveTypeOt = async () => {
        const activitiesCopy = activity.filter((data) => data.select === true).map(({ select, ...rest }) => rest);
        if (!nameType || !activitiesCopy[0]) {
            setResult("missed data")
            setTimeout(() => {
                setResult()
            }, 3000);
            return
        }
        const isNameUsed = await nameUsed(nameType, "typeOT")
        if (!isNameUsed) {
            setResult(postData("http://localhost:4000/postTypeOt", { nameType: nameType.trim(), activities: activitiesCopy }))
            searchAndSet()
            return
        }
        setResult("name used")
        setTimeout(() => {
            setResult()
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
        setNameType("")
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
            {result && (
                <ModalPortal type={"alert"} >
                    <Alerts Result={result} />
                </ModalPortal>
            )}

        </div>
    );
}
export default FormCreateType;