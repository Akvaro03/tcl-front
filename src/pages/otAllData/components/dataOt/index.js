import ModalPortal from "../../../../components/modelPortal";
import formatDateM from "../../../../hooks/formatDateM";
import changeActOt from "../../../../db/changeActOt";
import changeAuth from "../../../../db/changeAuth";
import AddActivity from "../addActivity";
import SelectUsers from "../selectUsers";
import { Button } from "@mui/material";
import Style from "./Data.module.css"
import { useState } from "react";

function DataOt({ otSelected, reload }) {
    const [activities, setActivities] = useState(JSON.parse(otSelected.Activities))
    const [activitySelected, setActivitySelected] = useState()
    const [userSelect, setUserSelect] = useState(false)
    const [addActivity, setAddActivity] = useState(false)
    const [auth, setAuth] = useState(otSelected.Auth)
    const selectUsers = (activity) => {
        setUserSelect(true)
        setActivitySelected(activity)
    }
    const closeForm = () => {
        setUserSelect(false)
    }
    const handleUsers = (users) => {
        try {
            const newActivities = activities.map(act => act === activitySelected ? { ...activitySelected, users: JSON.stringify(users) } : act);
            changeActOt({ id: otSelected.id, activity: newActivities }, otSelected.id, "Se editaron los usuarios", `${activitySelected.name} Usuarios: ${users.join(", ")}`)
            setActivities(newActivities)
            closeForm()
            reload()
        } catch (error) {
        }
    }
    const handleActivities = (newActivities) => {
        try {
            const added = getDifference(newActivities, activities);
            const eliminated = getDifference(activities, newActivities);
            const addedText = added.length > 0 && `Se agregó ${added.map(activity => activity.name).join(", ")}`;
            const eliminatedText = eliminated.length > 0 && `Se eliminó ${eliminated.map(activity => activity.name).join(", ")}`;
            const comment = (addedText && eliminatedText) ? addedText + " y " + eliminatedText : addedText || eliminatedText;
            setActivities(newActivities)
            changeActOt({ id: otSelected.id, activity: newActivities }, otSelected.id, "Se editaron las actividades", comment)
            setAddActivity(false)
            setTimeout(() => {
                reload()
            }, 5000);
        } catch (error) {
        }
    }
    const changeAuthButton = () => {
        changeAuth(otSelected)
        setAuth(auth === "1" ? "0" : "1")
    }
    return (
        <>
            <div className={Style.contentData}>
                <div className={Style.tittlesCategories}>
                    <div className={Style.contentTittle}>
                        <h1 className={Style.tittlePage}>OT Seleccionada</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Autorización</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Id de OT</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Tipo de OT</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Fecha</h1>
                    </div>
                    <div className={Style.contentActivities}>
                        <h1>Actividades</h1>
                    </div>
                    <div className={Style.addButton}>
                        <Button size="small" variant="outlined" sx={{ visibility: "hidden", paddingBottom: "10px" }}>Add activity</Button>
                    </div>
                    <div className={Style.ProductTittle}>
                        Producto
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Nombre</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Marca</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Modelo</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>DFR</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Retiro</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Entrega</h1>
                    </div>
                    <div className={Style.ProductTittle}>
                        Cliente
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Nombre</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>N° Cliente</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Contacto</h1>
                    </div>
                </div>
                <div className={Style.dataCategories}>
                    <div className={Style.contentTittle}>
                    </div>
                    {auth === "1" ? (
                        <div className={Style.auth} onClick={changeAuthButton}>
                            <h1>
                                Autorizado
                            </h1>
                        </div>

                    ) : (
                        <div className={Style.authNone} onClick={changeAuthButton}>
                            <h1>
                                No Autorizado
                            </h1>
                        </div>

                    )}

                    <div className={Style.contentTittle}>
                        <h1>{otSelected.id}</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>{otSelected.Type}</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>{formatDateM(otSelected.Date)}</h1>
                    </div>
                    <div className={Style.Activities}>
                        {activities && (
                            activities.map((activity, key) => {
                                return <div key={key} className={getUserActivity(activity) ? Style.activityProcess : Style.activity} onClick={() => { selectUsers(activity) }}>
                                    <h1>{activity.name}</h1>
                                </div>
                            })
                        )}
                    </div>
                    <div className={Style.addButton}>
                        <Button size="small" variant="outlined" onClick={setAddActivity}>Editar actividades</Button>
                    </div>
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>{otSelected.Producto}</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>{otSelected.Marca}</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>{otSelected.Modelo}</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>14/15/2003</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>14/15/2003</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>14/15/2003</h1>
                    </div>
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>{otSelected.Client}</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>26551</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>34122151</h1>
                    </div>

                </div>
            </div>
            {userSelect && (
                <ModalPortal type={"form"}>
                    <SelectUsers handleUsers={handleUsers} closeForm={closeForm} activitySelected={activitySelected} />
                </ModalPortal>
            )}
            {addActivity && (
                <ModalPortal type={"form"}>
                    <AddActivity ot={otSelected} handleActivities={handleActivities} setOtActivities={setActivities} otActivities={activities} setAddActivity={setAddActivity} />
                </ModalPortal>
            )}
        </>
    );
}

const getUserActivity = (activity) => {
    return JSON.parse(activity.users)[0]
}
function getDifference(a, b) {
    return a.filter(element => {
        return !b.includes(element);
    });
}

export default DataOt;