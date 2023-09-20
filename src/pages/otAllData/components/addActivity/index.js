import { Box, Button, Checkbox, Fade, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";

function AddActivity({ setAddActivity, otActivities, handleActivities }) {
    const [activities, setActivities] = useState()
    const [activitiesOt, setActivitiesOt] = useState(otActivities)
    useEffect(() => {
        getDataFromUrl("/getActivities")
            .then(data => setActivities(data))
    }, [])
    const compare = (name) => {
        const allNames = activitiesOt.map(activity => activity.name)
        return allNames.includes(name)
    }
    const handleChecked = (checked, activityNew) => {
        if (checked) {
            setActivitiesOt(prev => [...prev, activityNew])
        } else if (!checked) {
            setActivitiesOt(prev => prev.filter(activity => activity.name !== activityNew.name))
        }
    }
    const saveActivities = () => {
        handleActivities(activitiesOt)
    }

    return (
        <Fade in={true}>
            <Box sx={{ width: "60%", height: "40%", background: "white", alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "25%" }}>
                    <h1>
                        Selecciona actividades
                    </h1>
                </Box>
                <Box display={"flex"} height={"40%"} width={"90%"} flexWrap={"wrap"}>
                    {activities && activities.map((activity, key) => (
                        <div key={key}>
                            <FormControlLabel control={<Checkbox checked={compare(activity.name)} onChange={({ target: { checked } }) => { handleChecked(checked, activity) }} />} label={activity.name} />
                        </div>
                    ))}
                </Box>
                <Box height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                    <Button size="small" variant="outlined" onClick={() => setAddActivity(false)}>Cerrar</Button>
                    <Button size="large" variant="contained" onClick={() => saveActivities()}>Guardar</Button>
                </Box>
            </Box>
        </Fade>
    );
}

export default AddActivity;