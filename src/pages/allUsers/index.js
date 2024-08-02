import FormCreateUser from "../../components/forms/formCreateUser";
import TableUsers from "../../components/tables/TableUsers";
import ListPrototype from "../../components/listPrototype";
import ModalPortal from "../../components/modelPortal";
import ResponsiveAppBar from "../../components/navbar";
import headerList from "../../classes/headerList";
import AddIcon from '@mui/icons-material/Add';
import Alerts from "../../components/alerts";
import { useEffect, useState } from "react";
import Style from "./allUsers.module.css"
import { Fab } from "@mui/material";
import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";
import classToastList from "../../classes/classToastList";
import ToastList from "../../components/toastList";

function AllUser() {
    const [isForm, setIsForm] = useState()
    const [isFormEdit, setIsFormEdit] = useState()
    const [messageList, setMessageList] = useState([])
    const [Users, setUsers] = useState([{ id: 1, name: "", type: '', Team: "[]" }])
    const addAlert = (newAlert) => {
        classToastList.addToast(setMessageList, newAlert)
    }

    const closeReload = () => {
        setIsForm(false)
        setIsFormEdit(false)
        reload(setUsers, true)
    }

    useEffect(() => {
        const getData = async () => {
            reload(setUsers)
        }
        getData()
    }, [])
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentUsers}>
                <ListPrototype
                    header={headerUsers.getHeader()}
                    Table={TableUsers}
                    list={Users}
                    height={"85%"}
                    clickable={setIsFormEdit}
                />
            </div>
            <Fab onClick={() => setIsForm(true)} color="primary" aria-label="add" sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                <AddIcon />
            </Fab>
            {isForm && (
                <ModalPortal type={"form"}>
                    <FormCreateUser alert={addAlert} close={closeReload} />
                </ModalPortal>
            )}
            {isFormEdit && (
                <ModalPortal type={"form"}>
                    <FormCreateUser alert={addAlert} close={closeReload} user={isFormEdit} />
                </ModalPortal>
            )}
            <ToastList
                listData={messageList}
            />
        </>
    );
}
const headerUsers = new headerList()
headerUsers.addHeader("Nombre", "30%")
headerUsers.addHeader("Rol", "30%")
headerUsers.addHeader("Correo", "30%")


const reload = (setData, wait) => {
    if (wait) {
        setTimeout(() => {
            fetchAsyncUrl('/getUsers')
                .then(json => setData(json))
        }, 1000);
        return
    }
    fetchAsyncUrl('/getUsers')
        .then(json => setData(json))
}
export default AllUser;