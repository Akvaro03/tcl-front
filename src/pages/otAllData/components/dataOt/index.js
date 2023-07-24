import changeAvailability from '../../../../db/changeAvailability';
import ButtonRadius from '../../../../components/buttonRadius';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import getDataFromUrl from '../../../../hooks/getDataFromUrl';
import messageHistory from '../../../../hooks/messageHistory';
import ModalPortal from "../../../../components/modelPortal";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import formatDateM from "../../../../hooks/formatDateM";
import typesUsers from '../../../../classes/typesUsers';
import InputMui from "../../../../components/inputMui";
import formatDate from '../../../../hooks/formatDate';
import changeActOt from "../../../../db/changeActOt";
import changeAuth from "../../../../db/changeAuth";
import { Button, Fab, Fade } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import AddAvailability from '../addAvailability';
import changePay from '../../../../db/changePay';
import getUser from "../../../../hooks/getUser";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import editOt from "../../../../db/editOT";
import AddActivity from "../addActivity";
import SelectUsers from "../selectUsers";
import Style from "./Data.module.css"
import EditPay from '../editPay';
import AddPay from '../addPay';
import dayjs from "dayjs";
function DataOt({ otSelected, reload }) {
    const [availability, setAvailability] = useState(JSON.parse(otSelected.Availability))
    const [addAvailability, setAddAvailability] = useState(false)

    const [addPay, setAddPay] = useState(false)
    const [pay, setPay] = useState()

    const [editPay, setEditPay] = useState()

    const [activities, setActivities] = useState(JSON.parse(otSelected.Activities))
    const [activitySelected, setActivitySelected] = useState()
    const [addActivity, setAddActivity] = useState(false)

    const [userSelect, setUserSelect] = useState(false)
    const [auth, setAuth] = useState(otSelected.Auth)
    const [OT, SetOT] = useState(otSelected)
    const [edit, setEdit] = useState(false)
    const rolesUser = getUser("roles")
    useEffect(() => {
        const searchData = async () => {
            const pays = await getDataFromUrl('http://localhost:4000/getPay')
            const parsedFactura = JSON.parse(otSelected.Factura);
            const filteredPays = pays.filter(data => parsedFactura && parsedFactura.includes(data.id));
            setPay(filteredPays);
        }
        searchData()
    }, [otSelected.Factura])
    const isAdmin = (funct, data) => {
        if (funct && rolesUser.includes(typesUsers.Administrador)) {
            if (data) {
                funct(data)
                return
            }
            funct()
        };
        return rolesUser.includes(typesUsers.Administrador);
    }
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
            changeActOt({ id: otSelected.id, activity: newActivities }, otSelected.id, messageHistory.tittleEditUser, messageHistory.editUsersActivity(activitySelected.name, users.join(", ")))
            setActivities(newActivities)
            closeForm()
            reload()
        } catch (error) {
        }
    }
    const handleActivities = (newActivities) => {
        try {
            setActivities(newActivities)
            changeActOt({ id: otSelected.id, activity: newActivities }, otSelected.id, messageHistory.tittleEditActivities, messageHistory.editActivity(newActivities, activities))
            setAddActivity(false)
            reload()
        } catch (error) {
        }
    }
    const saveAvailability = (availability) => {
        try {
            setAvailability(availability)
            changeAvailability([{ id: otSelected.id, availability }], otSelected.id, messageHistory.tittleEditAvailability, messageHistory.editAvailability(availability))
            setAddAvailability(false)
            reload()
        } catch (error) {
        }
    }
    const savePay = (pay) => {
        try {
            changePay({ id: otSelected.id, pay }, otSelected.id, messageHistory.tittleEditPay, messageHistory.editPay(pay))
            setAddPay(false)
            setEditPay(false)
            reload()
        } catch (error) {
        }
    }
    const changeAuthButton = () => {
        const newAuth = otSelected.Auth === "1" ? 0 : 1;
        const dataToSend = { otId: otSelected.id, newAuth };
        changeAuth(dataToSend, otSelected.id,
            messageHistory.tittleEditaAuth, "")
        setAuth(auth === "1" ? "0" : "1")
        reload()
    }
    const handleOtSelected = (a, type) => {
        SetOT(prev => { return { ...prev, [type]: a } })
    }
    const handleEdit = () => {
        if (edit) {
            reload()
        }
        setEdit(prev => !prev)

    }
    const sendOTEdit = () => {
        const dataToSend = {
            Producto: OT.Producto,
            Marca: OT.Marca,
            Modelo: OT.Modelo,
            Cotizacion: OT.Cotizacion,
            Client: OT.Client,
            Date: OT.Date,
            id: OT.id
        }
        editOt(dataToSend, otSelected.id, messageHistory.editOT)
        reload()
        setEdit(false)
    }
    const closeEdit = () => {
        reload()
        SetOT(otSelected)
        setEdit(false)
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
                        <h1>Disposición</h1>
                    </div>
                    <div className={Style.ProductTittle}>
                        Facturación
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Facturas</h1>
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
                    {otSelected.Contact && otSelected.Contact[1] ? (
                        otSelected.Contact.map((contact, key) => (
                            <div key={key} className={Style.ProductSection}>
                                {key === 0 && <h1 >Contacto</h1>}
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
                        <div className={Style.auth} onClick={() => isAdmin(changeAuthButton)}>
                            <h1>
                                Autorizado
                            </h1>
                        </div>

                    ) : (
                        <div className={Style.authNone} onClick={() => isAdmin(changeAuthButton)}>
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
                        {<H1EditableDate onChange={(data) => handleOtSelected(formatDate(data), "Date")} edit={edit} text={OT.Date} />}
                    </div>
                    <hr className={Style.line} />
                    <div className={Style.Activities}>
                        {activities && (
                            activities.map((activity, key) => {
                                const users = JSON.parse(activity.users)
                                return <div key={key} className={activity.state === "End" && users[0] ? Style.activityEnd : getUserActivity(activity) ? Style.activityProcess : Style.activity} onClick={() => isAdmin(selectUsers, activity)}>
                                    <h1>{activity.name}</h1>
                                </div>
                            }))
                        }
                    </div>
                    <div className={Style.addButton}>
                        {rolesUser.includes(typesUsers.Administrador) ? (
                            <Button size="small" variant="outlined" onClick={setAddActivity}>Editar actividades</Button>
                        ) : (
                            <Button size="small" variant="outlined" sx={{ visibility: "hidden" }} onClick={setAddActivity}>Editar actividades</Button>
                        )}
                    </div>
                    <hr className={Style.line} />
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => handleOtSelected(data, "Producto")} edit={edit} text={OT.Producto} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => handleOtSelected(data, "Marca")} edit={edit} text={OT.Marca} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => handleOtSelected(data, "Modelo")} edit={edit} text={OT.Modelo} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => handleOtSelected(data, "Cotizacion")} edit={edit} text={OT.Cotizacion} />
                    </div>
                    <div className={Style.ProductContent}>
                        {availability ? (
                            <ButtonRadius onClick={() => isAdmin(setAddAvailability, true)} text={`${availability.type}  ${formatDateM(availability.date)}`} type={"success"} />
                        ) : (
                            isAdmin() ?
                                < ButtonRadius onClick={() => setAddAvailability(true)} text={"Agregar Disposición"} />
                                :
                                <h1>Pendiente</h1>
                        )}
                    </div>
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        {pay && (
                            <>
                                {pay.map((pay, key) => (
                                    pay.state === "paid" ?
                                        <ButtonRadius onClick={() => isAdmin(setEditPay, pay)} key={key} text={`${pay.id}`} type={"success"} />
                                        :
                                        <ButtonRadius onClick={() => isAdmin(setEditPay, pay)} key={key} text={`${pay.id}`} type={"error"} />
                                ))}
                            </>
                        )}
                        {isAdmin() ?
                            <ButtonRadius text={"Agregar Factura"} onClick={() => setAddPay(true)} />
                            :
                            !pay[0]
                            &&
                            <h1>Pendiente</h1>}
                    </div>
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => handleOtSelected(data, "Client")} edit={edit} text={OT.Client} />
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>26551</h1>
                    </div>
                    {otSelected.Contact && otSelected.Contact[1] ? (
                        otSelected.Contact.map((contact, key) => (
                            <div className={Style.ProductContent} key={key}>
                                <h1>{contact.type + ": " + contact.value} </h1>
                            </div>
                        ))
                    ) : (
                        <div className={Style.ProductContent}>
                            <h1>{otSelected.Contact[0].type + ": " + otSelected.Contact[0].value} </h1>
                        </div>
                    )}
                </div>
            </div >
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
            {addAvailability && (
                <ModalPortal type={"form"}>
                    <AddAvailability addAvailability={setAddAvailability} saveAvailability={saveAvailability} isDeletable={availability} />
                </ModalPortal>
            )}
            {editPay && (
                <ModalPortal type={"form"}>
                    <EditPay pay={editPay} pays={pay} deleteModal={setEditPay} savePay={savePay} />
                </ModalPortal>
            )}
            {addPay && (
                <ModalPortal type={"form"}>
                    <AddPay close={setAddPay} save={savePay} pay={pay} savePay={savePay} />
                </ModalPortal>
            )}
            {rolesUser.includes("Administrador") && (
                <>
                    {edit ? (
                        <>
                            <Fade in={true}>
                                <Fab color="error" aria-label="add" onClick={() => closeEdit()} sx={{ position: "fixed", right: "100px", bottom: "40px", zIndex: 1 }}>
                                    <ClearIcon />
                                </Fab>
                            </Fade>
                            <Fade in={true}>
                                <Fab color="success" aria-label="add" onClick={() => sendOTEdit()} sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                                    <SaveIcon />
                                </Fab>
                            </Fade>
                        </>
                    ) : (
                        <Fade in={true}>
                            <Fab color="primary" aria-label="add" onClick={handleEdit} sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                                <EditIcon />
                            </Fab>
                        </Fade>
                    )}
                </>
            )}
        </>
    );
}

const getUserActivity = (activity) => {
    return JSON.parse(activity.users)[0]
}
const H1Editable = ({ edit, text, onChange }) => {
    if (edit) {
        return <InputMui onChange={onChange} value={text} />
    }

    return <h1>{text}</h1>
}
const H1EditableDate = ({ edit, text, onChange }) => {
    if (edit) {
        return <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: 'small' } }}
                value={dayjs(text)} onChange={onChange} />
        </LocalizationProvider>
    }

    return <h1>{formatDateM(text)}</h1>
}
export default DataOt;