import ModalPortal from "../../../../components/modelPortal";
import formatDateM from "../../../../hooks/formatDateM";
import changeActOt from "../../../../db/changeActOt";
import changeAuth from "../../../../db/changeAuth";
import getUser from "../../../../hooks/getUser";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Fab } from "@mui/material";
import AddActivity from "../addActivity";
import SelectUsers from "../selectUsers";
import Style from "./Data.module.css"
import { useState } from "react";
import InputMui from "../../../../components/inputMui";

function DataOt({ otSelected, reload }) {
    const [activities, setActivities] = useState(JSON.parse(otSelected.Activities))
    const [activitySelected, setActivitySelected] = useState()
    const [userSelect, setUserSelect] = useState(false)
    const [addActivity, setAddActivity] = useState(false)
    const [auth, setAuth] = useState(otSelected.Auth)
    const [edit, setEdit] = useState(false)
    const rolesUser = getUser("roles")
    console.log(rolesUser)
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
            setTimeout(() => {
                reload()
            }, 2000);
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
            }, 2000);
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
                    <hr className={Style.line} />
                    <div className={Style.contentActivities}>
                        <h1>Actividades</h1>
                    </div>
                    <div className={Style.addButton}>
                        <Button size="small" variant="outlined" sx={{ visibility: "hidden", paddingBottom: "10px" }}>Add activity</Button>
                    </div>
                    <hr className={Style.line} />
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
                        <h1>Cotización</h1>
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
                        Facturación
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Dato N1</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Dato N2</h1>
                    </div>
                    <div className={Style.ProductTittle}>
                        Cliente
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Empresa</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>N° Cliente</h1>
                    </div>
                    {otSelected.Contact[1] ? (
                        otSelected.Contact.map((contact, key) => (
                            <div className={Style.ProductSection}>
                                {key === 0 && <h1>Contacto</h1>}
                            </div>
                        ))
                    ) : (
                        <div className={Style.ProductSection}>
                            <h1>Contacto</h1>
                        </div>
                    )}
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
                        {<H1Editable edit={edit} text={formatDateM(otSelected.Date)} />}
                    </div>
                    <hr className={Style.line} />
                    <div className={Style.Activities}>
                        {activities && (
                            activities.map((activity, key) => (
                                <div key={key} className={activity.state === "End" ? Style.activityEnd : getUserActivity(activity) ? Style.activityProcess : Style.activity} onClick={() => { selectUsers(activity) }}>
                                    <h1>{activity.name}</h1>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={Style.addButton}>
                        <Button size="small" variant="outlined" onClick={setAddActivity}>Editar actividades</Button>
                    </div>
                    <hr className={Style.line} />

                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable edit={edit} text={otSelected.Producto} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable edit={edit} text={otSelected.Marca} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable edit={edit} text={otSelected.Modelo} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable edit={edit} text={otSelected.Cotizacion} />
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
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable edit={edit} text={otSelected.Client} />
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>26551</h1>
                    </div>
                    {otSelected.Contact[1] ? (
                        otSelected.Contact.map(contact => (
                            <div className={Style.ProductContent}>
                                <h1>{contact.type + ": " + contact.value} </h1>
                            </div>
                        ))
                    ) : (
                        <div className={Style.ProductContent}>
                            <h1>{otSelected.Contact.type + ": " + otSelected.Contact.value} </h1>
                        </div>
                    )}

                </div>
            </div >
            {userSelect && (
                <ModalPortal type={"form"}>
                    <SelectUsers handleUsers={handleUsers} closeForm={closeForm} activitySelected={activitySelected} />
                </ModalPortal>
            )
            }
            {
                addActivity && (
                    <ModalPortal type={"form"}>
                        <AddActivity ot={otSelected} handleActivities={handleActivities} setOtActivities={setActivities} otActivities={activities} setAddActivity={setAddActivity} />
                    </ModalPortal>
                )
            }
            {rolesUser.includes("Administrador") && (
                <Fab color="primary" aria-label="add" onClick={() => { setEdit(prev => !prev) }} sx={{ position: "fixed", right: "40px", bottom: "40px" }}>
                    <EditIcon />
                </Fab>
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
const formatNumber = (number) => {
    if (Number(number)) {
        return Number(number).toLocaleString("es-AR", { style: "currency", currency: "ARS" });
    }
    return "No se introdujo un numero"
}
const H1Editable = ({ edit, ot, text }) => {
    if (edit) {
        return <InputMui value={text} />
    }

    return <h1>{text}</h1>
}
export default DataOt;