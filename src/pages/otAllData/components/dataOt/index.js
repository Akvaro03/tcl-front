import changeAvailability from '../../../../db/changeAvailability';
import ButtonRadius from '../../../../components/buttonRadius';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import getDataFromUrl from '../../../../hooks/getDataFromUrl';
import messageHistory from '../../../../hooks/messageHistory';
import ModalPortal from "../../../../components/modelPortal";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import permissions from '../../../../classes/permissions';
import inputClass from '../../../../classes/inputClass';
import formatDateM from "../../../../hooks/formatDateM";
import formatDate from '../../../../hooks/formatDate';
import changeActOt from "../../../../db/changeActOt";
import Alerts from '../../../../components/alerts';
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
import ContentPay from '../contentPay';
import Style from "./Data.module.css";
import OptionPay from '../optionPay';
import dayjs from "dayjs";
function DataOt({ otSelected, reload }) {
    const [availability, setAvailability] = useState(JSON.parse(otSelected.Availability))
    const [addAvailability, setAddAvailability] = useState(false)

    const [addPay, setAddPay] = useState(false)
    const [pay, setPay] = useState()

    const [editPay, setEditPay] = useState()
    const [activities, setActivities] = useState(otSelected.Activities && JSON.parse(otSelected.Activities))
    const [activitySelected, setActivitySelected] = useState()
    const [addActivity, setAddActivity] = useState(false)

    const [userSelect, setUserSelect] = useState(false)
    const [auth, setAuth] = useState(otSelected.Auth)
    const [OT, SetOT] = useState(otSelected)
    const [edit, setEdit] = useState(false)
    const rol = getUser("roles")

    const [result, setResult] = useState()

    useEffect(() => {
        const searchData = async () => {
            const pays = await getDataFromUrl('/getPay')
            const parsedFactura = JSON.parse(otSelected.Factura);
            const filteredPays = pays.filter(data => parsedFactura && parsedFactura.includes(data.id));
            setPay(filteredPays);
        }
        searchData()
    }, [otSelected.Factura])
    const selectUsers = (activity) => {
        setUserSelect(true)
        setActivitySelected(activity)
    }
    const closeForm = () => {
        setUserSelect(false)
    }
    const handleUsers = (users, score) => {
        try {
            const newActivities = activities.map(act => act === activitySelected ? { ...activitySelected, users: JSON.stringify(users), score } : act);
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
                .then(data => {
                    setResult(data);
                    setTimeout(() => {
                        setResult()
                    }, 2000);
                })
            setAddPay(false)
            setEditPay(false)
            reload()
        } catch (error) {
            reload()
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
    const addListPay = (newPay) => {
        newPay.newList = pay.map(data => data.id)
        newPay.newList.push(newPay.id)
        newPay.select = true;
        savePay(newPay)
    }
    const inputDataOt = new inputClass(sendOTEdit)
    const H1Editable = ({ edit, text, onChange }) => {
        if (edit) {
            return inputDataOt.getInput(onChange, text)
        }

        return <h1>{text}</h1>
    }
    const closeEditPay = () => {
        reload()
        setEditPay()
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
                        {otSelected.OTKey}
                    </div>
                    {auth === "1" ? (
                        <div className={permissions.editAuth(rol) ? Style.authClickable : Style.auth} onClick={() => permissions.editAuth(rol) && changeAuthButton()}>
                            <h1>
                                Autorizado
                            </h1>
                        </div>

                    ) : (
                        <div className={permissions.editAuth(rol) ? Style.authNoneClickable : Style.auth} onClick={() => permissions.editAuth(rol) && changeAuthButton()}>
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
                                return permissions.editActv(rol) ? (
                                    <div key={key} className={activity.state === "End" && users[0] ? Style.activityEndClickable : activity.state === "Started" && users[0] ? Style.activityProcessClickable : getUserActivity(activity) ? Style.activityAssignedClickable : Style.activityClickable}
                                        onClick={() => permissions.editActv(rol) && selectUsers(activity)}>
                                        <h1>{activity.name}</h1>
                                    </div>
                                ) : (
                                    <div key={key} className={activity.state === "End" && users[0] ? Style.activityEnd : activity.state === "Started" && users[0] ? Style.activityProcess : getUserActivity(activity) ? Style.activityAssigned : Style.activity}
                                        onClick={() => permissions.editActv(rol) && selectUsers(activity)}>
                                        <h1>{activity.name}</h1>
                                    </div>

                                )
                            }))
                        }
                    </div>
                    <div className={Style.addButton}>
                        {permissions.editActv(rol) ? (
                            <Button size="small" variant="outlined"
                                onClick={setAddActivity}>Editar actividades</Button>
                        ) : (
                            <Button size="small" variant="outlined" sx={{ visibility: "hidden" }}
                                onClick={setAddActivity}>Editar actividades</Button>
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
                            <ButtonRadius onClick={() => permissions.editMuestra(rol) && setAddAvailability(true)} text={`${availability.type}  ${formatDateM(availability.date)}`} type={"success"} />
                        ) : (
                            permissions.editMuestra(rol) ?
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
                                    pay.datePay ?
                                        <ButtonRadius onClick={() => permissions.editPay(rol) && setEditPay(pay)} key={key} text={`${pay.id}`} type={"success"} />
                                        :
                                        <ButtonRadius onClick={() => permissions.editPay(rol) && setEditPay(pay)} key={key} text={`${pay.id}`} type={"error"} />
                                ))}
                            </>
                        )}
                        {permissions.editPay(rol) ?
                            <ButtonRadius text={"Agregar Factura"} onClick={() => setAddPay(true)} />
                            :
                            !pay
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
                    {otSelected.Contact && (
                        (otSelected.Contact && otSelected.Contact[1]) ? (
                            otSelected.Contact.map((contact, key) => (
                                <div className={Style.ProductContent} key={key}>
                                    <h1>{contact.type + ": " + contact.value} </h1>
                                </div>
                            ))
                        ) : (
                            <div className={Style.ProductContent}>
                                <h1>{otSelected.Contact[0].type + ": " + otSelected.Contact[0].value} </h1>
                            </div>
                        )
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
                    <OptionPay pay={editPay} pays={pay} deleteModal={closeEditPay} savePay={savePay} />
                </ModalPortal>
            )}
            {addPay && (
                <ModalPortal type={"form"}>
                    <ContentPay close={setAddPay} save={savePay} pay={pay} saveList={addListPay} listPay={pay.map(data => data.id)} />
                </ModalPortal>
            )}
            {result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={result} />
                </ModalPortal>
            )}
            {permissions.editOt(rol) && (
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