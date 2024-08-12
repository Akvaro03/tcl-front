import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";
import FormPrototype from "../formPrototype";
import ModalPortal from "../modelPortal";

function AddActivity({ setAddActivity, otActivities, handleActivities }) {
    const [activities, setActivities] = useState()
    const [activitiesOt, setActivitiesOt] = useState(otActivities)
    useEffect(() => {
        fetchAsyncUrl("/getActivities")
            .then(data => setActivities(data))
    }, [])

    const compare = (name) => activitiesOt ? activitiesOt.some(activity => activity.name.toUpperCase() === name.toUpperCase()) : false;

    const handleChecked = (checked, activityNew) => {
        setActivitiesOt(prev => {
            if (checked) {
                return [...(prev || []), activityNew]
            } else {
                return prev ? prev.filter(activity => activity.name !== activityNew.name) : []
            }
        })
    }
    const saveActivities = () => {
        handleActivities(activitiesOt)
    }

    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={() => setAddActivity(false)} tittle={"Seleccione actividades"}>
                <Box display={"flex"} height={"40%"} width={"90%"} flexWrap={"wrap"}>
                    {activities && activities.map((activity, key) => (
                        <div key={key}>
                            <FormControlLabel control={<Checkbox checked={compare(activity.name)} onChange={({ target: { checked } }) => { handleChecked(checked, activity) }} />} label={activity.name} />
                        </div>
                    ))}
                </Box>
                <Box height={"40%"} display={"flex"} width={"100%"} margin={"10px 0  20px 0"} alignItems={"center"} justifyContent={"center"}>
                    <Button size="large" variant="contained" onClick={() => saveActivities()}>Guardar</Button>
                </Box>
            </FormPrototype>
        </ModalPortal>
    );
}

export default AddActivity;