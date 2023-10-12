import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import getDataFromUrl from "../../../hooks/getDataFromUrl";
import inputClass from "../../../classes/inputClass";
import deleteTypeOt from "../../../db/deleteTypeOt";
import FormPrototype from "../../formPrototype";
import editTypeOt from "../../../db/editTypeOt";
import Style from "./formCreateType.module.css"
import { useEffect, useState } from "react";
import addType from "../../../db/addType";

function FormCreateType({ close, menssage, data, reload }) {
    const [activity, setActivity] = useState({})
    const [name, setName] = useState(data ? data.nameType : "")
    const [abbr, setAbbr] = useState(data ? data.abbreviation : "")
    useEffect(() => {
        searchAndSet(data)
    }, [data])
    const saveTypeOt = async () => {
        const activitiesCopy = activity.filter((data) => data.select === true).map(({ select, ...rest }) => rest);
        if (!name || !activitiesCopy[0] || !abbr) {
            menssage("missed data")
            setTimeout(() => {
                menssage()
            }, 3000);
            return
        }
        let result;
        if (data) {
            result = await editTypeOt({ nameType: isChanged(name.trim(), data.nameType), activities: activitiesCopy, abbr: isChanged(abbr, data.abbreviation), id: data.id })
        } else {
            result = await addType({ nameType: name.trim(), activities: activitiesCopy, abbr })
        }
        menssage(result)
        setTimeout(() => {
            menssage()
        }, 3000);
        if (result !== "name used" && result !== "abbr max") {
            reload && reload()
            close()
        }
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
    const onDelete = () => {
        menssage(deleteTypeOt({ id: data.id }))
        reload()
        close()
    }
    const searchAndSet = (data, reset) => {
        getDataFromUrl("/getActivities")
            .then(activities => {
                return formatActivities(activities, data);
            })
            .then(data => setActivity(data));
        if (reset) {
            setAbbr("");
            setName("");
        }
    }
    const isChanged = (data, prevData) => {
        return data === prevData ? null : data;
    }
    const inputType = new inputClass(saveTypeOt)
    return (
        <FormPrototype close={close} tittle={data ? "Editar tipo de OT" : "Nuevo tipo de OT"} onDelete={data && onDelete}>
            <div className={Style.ContentForm}>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Nombre:
                    </p>
                    <div className={Style.input}>
                        {inputType.getInput(name, setName)}
                    </div>
                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Identificador:
                    </p>
                    <div className={Style.input}>
                        {inputType.getInput(abbr, setAbbr)}
                    </div>
                </div>
                <p >
                    Actividades por defecto:
                </p>
                <Box component={"div"} display={"flex"} width={"100%"} flexWrap={"wrap"} alignItems={"center"}>
                    {activity[0] && (
                        activity.map((user, key) => (
                            <div key={key}>
                                <FormControlLabel
                                    control={<Checkbox checked={user.select}
                                        onChange={({ target: { checked } }) => { handleState(user, checked) }} />} label={user.name} />
                            </div>
                        ))
                    )}
                </Box>
            </div>
            <div className={Style.buttonSave}>
                <Button variant="outlined" onClick={() => close()}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={saveTypeOt}>
                    Guardar Tipo
                </Button>
            </div>
        </FormPrototype >
    );
}

const formatActivities = (data, prevData) => {
    const namesActivities = prevData ? JSON.parse(prevData.activities).map(activity => activity.name) : []
    data.forEach(item => {
        item.select = namesActivities.includes(item.name);
    });
    return data;
}
export default FormCreateType;