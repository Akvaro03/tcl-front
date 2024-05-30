import changeAvailability from '../../../../db/changeAvailability';
import ButtonRadius from '../../../../components/buttonRadius';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import messageHistory from '../../../../hooks/messageHistory';
import ClassPriorityOt from '../../../../classes/priorityOt';
import ModalPortal from "../../../../components/modelPortal";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import PriorityOt from '../../../../components/priorityOt';
import permissions from '../../../../classes/permissions';
import inputClass from '../../../../classes/inputClass';
import formatDateM from "../../../../hooks/formatDateM";
import { Box, Button, Fab, Fade } from "@mui/material";
import formatDate from '../../../../hooks/formatDate';
import changeActOt from "../../../../db/changeActOt";
import PrintOt from '../../../../components/printOt';
import Alerts from '../../../../components/alerts';
import changeAuth from "../../../../db/changeAuth";
import PrintIcon from '@mui/icons-material/Print';
import ClearIcon from '@mui/icons-material/Clear';
import AddAvailability from '../addAvailability';
import changePay from '../../../../db/changePay';
import getUser from "../../../../hooks/getUser";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TypeOt from '../../../../types/typeOt';
import { useState } from "react";
import editOt from "../../../../db/editOT";
import AddActivity from "../addActivity";
import SelectUsers from "../selectUsers";
import AddContact from '../addContact';
import ContentPay from '../contentPay';
import Style from "./Data.module.css";
import OptionPay from '../optionPay';
import dayjs from "dayjs";
import SelectContact from '../../../../components/selectContract';

function DataOt({ otSelected, reload, setOTSelected }) {
    const { Activities, id, Contact, pay, Auth, Type, Description,
        contractName, Observations,
        FechaVencimiento, OTKey, Availability, IdClient, nLacre, Date, priority,
        Client, Producto, Marca, Modelo, Cotizacion } = otSelected

    const [addAvailability, setAddAvailability] = useState(false)
    const [activitySelected, setActivitySelected] = useState()
    const [addActivity, setAddActivity] = useState(false)
    const [addContact, setAddContact] = useState(false)
    const [userSelect, setUserSelect] = useState(false)
    const [addPay, setAddPay] = useState(false)
    const [edit, setEdit] = useState(false)
    const [result, setResult] = useState()
    const [printOt, setPrintOt] = useState(false)

    const [uiState, setUIState] = useState({
        addAvailability: false,
        activitySelected: null,
        addActivity: false,
        addContact: false,
        userSelect: false,
        addPay: false,
        editPay: null,
        edit: false,
        result: null,
        printOt: false
    });

    const handleUIStateChange = (key, value) => {
        setUIState(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const rol = getUser("roles")

    const selectUsers = (activity) => {
        setUserSelect(true)
        setActivitySelected(activity)
    }
    const closeForm = () => {
        setUserSelect(false)
    }
    const handleUsers = (users, score) => {
        try {
            const newActivities = Activities.map(act => act === activitySelected ? { ...activitySelected, users: JSON.stringify(users), score } : act);
            changeActOt({ id: id, activity: newActivities }, id, messageHistory.tittleEditUser, messageHistory.editUsersActivity(activitySelected.name, users.join(", ")))
            setOTSelected(newActivities, "Activities")
            closeForm()
            reload()
        } catch (error) {
        }
    }
    const handleActivities = (newActivities) => {
        try {
            setOTSelected(newActivities, "Activities")
            changeActOt({ id: id, activity: newActivities }, id, messageHistory.tittleEditActivities, messageHistory.editActivity(newActivities, Activities))
            setAddActivity(false)
            reload()
        } catch (error) {
        }
    }
    const saveAvailability = (availability) => {
        try {
            setOTSelected(availability, "Availability")
            changeAvailability([{ id: id, availability }], id, messageHistory.tittleEditAvailability, messageHistory.editAvailability(availability))
            setAddAvailability(false)
            reload()
        } catch (error) {
        }
    }
    const savePay = (pay) => {
        try {
            changePay({ id: id, pay }, id, messageHistory.tittleEditPay, messageHistory.editPay(pay))
                .then(data => {
                    setResult(data);
                    setTimeout(() => {
                        setResult()
                    }, 2000);
                })
            setAddPay(false)
            handleUIStateChange("editPay", null)
            reload()
        } catch (error) {
            reload()
        }
    }
    const changeAuthButton = () => {
        const newAuth = Auth === "1" ? 0 : 1;
        const dataToSend = { otId: id, newAuth };
        changeAuth(dataToSend, id,
            messageHistory.tittleEditaAuth, "")
        reload()
    }
    const handleEdit = () => {
        if (edit) {
            reload()
        }
        setEdit(prev => !prev)

    }
    const sendOTEdit = (newContacts) => {
        newContacts && setOTSelected(newContacts, "Contact")
        newContacts && setAddContact();
        const otEdit = new TypeOt({ ...otSelected, "Contact": newContacts ? newContacts : Contact })
        editOt(otEdit, id, messageHistory.tittleEditOT)
        reload()
        setEdit(false)
    }
    const closeEdit = () => {
        reload()
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
            return inputDataOt.getInput(text ? text : " ", onChange)
        }

        return <h1>{text}</h1>
    }
    const closeEditPay = () => {
        reload()
        handleUIStateChange("editPay", null)
    }
    const handlePriority = () => {
        const newPriority = ClassPriorityOt.handleClick(priority)
        setOTSelected(newPriority, "priority")
        const otEdit = new TypeOt({ ...otSelected, priority: newPriority })
        editOt(otEdit, id, messageHistory.tittleEditPriority)
        reload()
    }
    return (
        <>
            <div className={Style.contentData}>
                <Box position={"absolute"} right={"6%"} top={"-1%"} color={"white"} component={"div"} onClick={handlePriority}>
                    <PriorityOt priority={priority} />
                </Box>
                {/* Encabezados */}
                <div className={Style.tittlesCategories}>
                    {/* OT */}
                    <div className={Style.contentTittle}>
                        <h1 className={Style.tittlePage}>OT Seleccionada</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Autorización</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>ID de OT</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Tipo de OT</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Fecha</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Vto. DEL CERTIFICADO</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Nº Lacre</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>Contrato</h1>
                    </div>
                    {/* Cliente */}
                    <hr className={Style.line} />
                    <div className={Style.ProductTittle}>
                        Cliente
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Empresa</h1>
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>N° Cliente</h1>
                    </div>
                    {Contact ? (
                        Contact.map((contact, key) => (
                            <div key={key} className={Style.ProductSection}>
                                {key === 0 && <h1 >Contacto</h1>}
                            </div>
                        ))
                    ) : (
                        <div className={Style.ProductSection}>
                            <h1>Contacto</h1>
                        </div>
                    )}

                    {/* Actividades */}
                    <hr className={Style.line} />
                    <div className={Style.contentActivities}>
                        <h1>Actividades</h1>
                    </div>
                    <div className={Style.addButton}>
                        <Button size="small" variant="outlined" sx={{ visibility: "hidden", paddingBottom: "10px" }}>Add activity</Button>
                    </div>

                    {/* Producto */}
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
                    <div className={Style.ProductSection}>
                        <h1>Observación</h1>
                    </div>

                    {/* Facturación */}
                    <hr className={Style.line} />
                    <div className={Style.ProductTittle}>
                        Facturación
                    </div>
                    <div className={Style.ProductSection}>
                        <h1>Facturas</h1>
                    </div>
                    {permissions.seeDetails(rol) && (
                        <div className={Style.ProductTittle}>
                            Detalles
                        </div>
                    )}

                </div>

                {/* Datos */}
                <div className={Style.dataCategories}>

                    {/* OT */}
                    <div className={Style.contentTittle}>
                        {OTKey}
                    </div>
                    {Auth === "1" ? (
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
                        <h1>{id}</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        <h1>{Type}</h1>
                    </div>
                    <div className={Style.contentTittle}>
                        {<H1EditableDate onChange={(data) => setOTSelected(formatDate(data), "Date")} edit={edit} text={Date} />}
                    </div>
                    <div className={Style.contentTittle}>
                        {<H1EditableDate onChange={(data) => setOTSelected(formatDate(data), "FechaVencimiento")} edit={edit} text={FechaVencimiento} />}
                    </div>
                    <div className={Style.contentTittle}>
                        <H1Editable onChange={data => setOTSelected(data, "nLacre")} edit={edit} text={nLacre} />
                    </div>
                    <div className={Style.contentTittle}>
                        {edit ? (
                            <SelectContact defaultValue={contractName.label} setData={data => setOTSelected(data, "contractName")} />
                        ) : (
                            <h1>{contractName?.label}</h1>
                        )}
                    </div>
                    {/* Cliente */}
                    <hr className={Style.line} />
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>{Client}</h1>
                    </div>
                    <div className={Style.ProductContent}>
                        <h1>{IdClient}</h1>
                    </div>
                    {Contact ?
                        Contact.map((contact, key) => (
                            <div className={Style.ProductContent} key={key}>
                                <Box sx={{ paddingLeft: "15px" }}><h1 onClick={setAddContact}>{`Tipo: ${contact.type} `} </h1></Box>
                                <Box sx={{ paddingLeft: "15px" }}><h1 onClick={setAddContact}>{`Contact: ${contact.contact} `} </h1></Box>
                                <Box sx={{ paddingLeft: "15px" }}><h1 onClick={setAddContact}>{`Email: ${contact.email} `} </h1></Box>
                                <Box sx={{ paddingLeft: "15px" }}><h1 onClick={setAddContact}>{`Telefono: ${contact.cell} `} </h1></Box>
                            </div>
                        ))
                        :
                        <div className={Style.ProductContent}>
                            {permissions.editActv(rol) && (
                                <Button size="small" variant="outlined"
                                    onClick={() => setAddContact(true)}>Agregar contacto</Button>
                            )}
                        </div>
                    }

                    {/* Actividades */}
                    <hr className={Style.line} />
                    <div className={Style.Activities}>
                        {Activities && (
                            Activities.map((activity, key) => {
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

                    {/* Producto */}
                    <hr className={Style.line} />
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => setOTSelected(data, "Producto")} edit={edit} text={Producto} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => setOTSelected(data, "Marca")} edit={edit} text={Marca} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => setOTSelected(data, "Modelo")} edit={edit} text={Modelo} />
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => setOTSelected(data, "Cotizacion")} edit={edit} text={Cotizacion} />
                    </div>
                    <div className={Style.ProductContent}>
                        {Availability ? (
                            <ButtonRadius onClick={() => permissions.editMuestra(rol) && setAddAvailability(true)} text={`${Availability.type}  ${formatDateM(Availability.date)}`} type={"success"} />
                        ) : (
                            permissions.editMuestra(rol) ?
                                < ButtonRadius onClick={() => setAddAvailability(true)} text={"Agregar Disposición"} />
                                :
                                <h1>Pendiente</h1>
                        )}
                    </div>
                    <div className={Style.ProductContent}>
                        <H1Editable onChange={data => setOTSelected(data, "Observations")} edit={edit} text={Observations} />
                    </div>
                    {/* Facturación */}
                    <hr className={Style.line} />
                    <div className={Style.ProductTittle}>
                    </div>
                    <div className={Style.ProductContent}>
                        {pay && (
                            <>
                                {pay.map((pay, key) => (
                                    pay.datePay ?
                                        <ButtonRadius onClick={() => permissions.editPay(rol) && handleUIStateChange("editPay", pay)} key={key} text={`${pay.id}`} type={"success"} />
                                        :
                                        <ButtonRadius onClick={() => permissions.editPay(rol) && handleUIStateChange("editPay", pay)} key={key} text={`${pay.id}`} type={"error"} />
                                ))}
                            </>
                        )}
                        {permissions.editPay(rol) ?
                            <ButtonRadius text={"Agregar Factura"} onClick={() => setAddPay(true)} />
                            :
                            !pay && <h1>Pendiente</h1>
                        }
                    </div>
                    {permissions.seeDetails(rol) && (
                        <div className={Style.ProductContent}>
                            {Description.map((data, key) => (
                                <Box display={"flex"} gap={"15px"} key={key} margin={"5px 0"} width={"100%"}>
                                    <Box sx={{ width: "7%" }}>{data.item}</Box>
                                    <Box sx={{ width: "50%" }}>{data.Description}</Box>
                                    {data.import > 0 && (
                                        <Box sx={{ width: "15%" }}>${data.import}</Box>
                                    )}
                                </Box>
                            ))}
                            <Box sx={{ marginTop: "15px" }}>
                                Total:
                                ${Description[1] ? Description.reduce((a, b) => { return a.import + b.import }) : Description[0].import
                                }</Box>
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
                    <AddActivity handleActivities={handleActivities} otActivities={Activities} setAddActivity={setAddActivity} />
                </ModalPortal>
            )}
            {addAvailability && (
                <ModalPortal type={"form"}>
                    <AddAvailability addAvailability={setAddAvailability} saveAvailability={saveAvailability} isDeletable={Availability} />
                </ModalPortal>
            )}
            {addContact && (
                <ModalPortal type={"form"}>
                    <AddContact close={setAddContact} save={sendOTEdit} prevContacts={Contact} />
                </ModalPortal>
            )}
            {uiState.editPay && (
                <ModalPortal type={"form"}>
                    <OptionPay pay={uiState.editPay} pays={pay} deleteModal={closeEditPay} savePay={savePay} />
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
            {printOt && (
                <ModalPortal type={"form"}>
                    <PrintOt Result={id} close={setPrintOt} />
                </ModalPortal>
            )}

            <Fade in={true}>
                <Fab color="primary" aria-label="add" onClick={() => setPrintOt(true)} sx={{ position: "fixed", right: "100px", bottom: "40px", zIndex: 1 }}>
                    <PrintIcon />
                </Fab>
            </Fade>
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