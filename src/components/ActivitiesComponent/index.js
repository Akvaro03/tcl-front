import { Button } from "@mui/material";
import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";
import Style from "./ActivitiesComponent.module.css"
import { useState } from "react";
import ActivityButton from "../activityButton";
import SelectUsers from "../selectUsers";
import AddActivity from "../addActivity";

function ActivitiesComponent({ Activities, saveChanges }) {
    const [isFormActivity, setIsFormActivity] = useState()
    const [activitySelected, setActivitySelected] = useState()
    if (!Activities) return ""
    const rol = getUser("roles")
    const handleUsers = (data) => {
        saveChanges(Activities.map(activity => activity.name.toUpperCase() === activitySelected.name.toUpperCase() ? { ...activity, users: JSON.stringify(data) } : activity))
    }
    return (
        <div className={Style.ActivitiesBody}>

            <div className={Style.contentActivities}>
                {Activities.map((activity, key) => (
                    <ActivityButton isClickable={permissions.editActv(rol)} key={key} activity={activity} onClick={setActivitySelected} />
                ))}
            </div>


            {permissions.editActv(rol) && (
                <Button size="small" variant="outlined"
                    onClick={setIsFormActivity}>Editar actividades</Button>
            )}
            {isFormActivity && (
                <AddActivity
                    handleActivities={saveChanges}
                    otActivities={Activities}
                    setAddActivity={setIsFormActivity} />
            )}
            {activitySelected && (
                <SelectUsers
                    handleUsers={handleUsers}
                    closeForm={setActivitySelected}
                    activitySelected={activitySelected} />
            )}
        </div>

    );
}

export default ActivitiesComponent;