import ModalPortal from "../../../../components/modelPortal";
import formatDateM from "../../../../hooks/formatDateM";
import changeAuth from "../../../../hooks/changeAuth";
import postData from "../../../../hooks/postData";
import SelectUsers from "../selectUsers";
import { Button } from "@mui/material";
import Style from "./Data.module.css"
import { useState } from "react";

function DataOt({ otSelected }) {
    const [activities, setActivities] = useState(JSON.parse(otSelected.Activities))
    const [activitySelected, setActivitySelected] = useState()
    const [userSelect, setUserSelect] = useState(false)
    const [auth, setAuth] = useState(otSelected.Aut)
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
            postData("http://localhost:4000/editOtActivities", { id: otSelected.id, activity: newActivities })
            setActivities(newActivities)
            closeForm()
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
                    <div className={Style.contentTittle}>
                        <h1>Autorización</h1>
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
                        <Button size="small" variant="outlined">Añadir actividad</Button>
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
        </>
    );
}

const getUserActivity = (activity) => {
    return JSON.parse(activity.users)[0]
}

export default DataOt;