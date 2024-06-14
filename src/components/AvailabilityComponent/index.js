import { useState } from "react";
import formatDateM from "../../hooks/formatDateM";
import Style from "./AvailabilityComponent.module.css"
import permissions from "../../classes/permissions";
import getUser from "../../hooks/getUser";
import AddAvailability from "../../pages/otAllData/components/addAvailability";
function AvailabilityComponent({ Availability, saveChanges }) {
    const [isAvailability, setIsAvailability] = useState()
    const rol = getUser("roles")
    if (!permissions.editMuestra(rol)) return ""
    if (!Availability && permissions.editMuestra(rol)) return (
        <>
            <p
                onClick={() => setIsAvailability(true)}
                className={Style.addAvailability}>
                Agregar Disposición
            </p>
            {isAvailability && (
                <AddAvailability
                    addAvailability={setIsAvailability}
                    saveAvailability={saveChanges}
                    isDeletable={Availability} />
            )}
        </>
    )
    if (!Availability) return ""

    return (
        <>
            <p
                onClick={() => permissions.editMuestra(rol) && setIsAvailability(true)}
                className={Style.AvailabilityButton}>
                {Availability.type + " " + formatDateM(Availability.date)}
            </p>

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