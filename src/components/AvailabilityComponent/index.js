import { useState } from "react";
import formatDateM from "../../hooks/formatDateM";
import Style from "./AvailabilityComponent.module.css"
import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";
import AddAvailability from "../../pages/otAllData/components/addAvailability";
function AvailabilityComponent({ Availability, saveChanges }) {
    const [isAvailability, setIsAvailability] = useState()
    if (!Availability) return ""
    const rol = getUser("roles")
    return (
        <>
            <p onClick={() => permissions.editMuestra(rol) && setIsAvailability(true)}
                className={Style.AvailabilityButton}
            >{Availability.type + " " + formatDateM(Availability.date)}</p>
            {isAvailability && (
                <AddAvailability
                    addAvailability={setIsAvailability}
                    saveAvailability={saveChanges}
                    isDeletable={Availability} />
            )}
        </>
    );
}

export default AvailabilityComponent;