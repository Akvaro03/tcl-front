import FormCreateUser from "../../components/forms/formCreateUser";
import TableUsers from "../../components/tables/TableUsers";
import ListPrototype from "../../components/listPrototype";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ModalPortal from "../../components/modelPortal";
import ResponsiveAppBar from "../../components/navbar";
import headerList from "../../classes/headerList";
import AddIcon from '@mui/icons-material/Add';
import Alerts from "../../components/alerts";
import { useEffect, useState } from "react";
import Style from "./allUsers.module.css"
import { Fab } from "@mui/material";

function AllUser() {
    const [isForm, setIsForm] = useState()
    const [isFormEdit, setIsFormEdit] = useState()
    const [alert, SetAlert] = useState()
    const [Users, setUsers] = useState([{ id: 1, name: "", type: '', Team: "[]" }])
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
                    <FormCreateUser alert={SetAlert} close={setIsForm} reload={() => reload(setUsers, true)} />
                </ModalPortal>
            )}
            {isFormEdit && (
                <ModalPortal type={"form"}>
                    <FormCreateUser alert={SetAlert} user={isFormEdit} close={setIsFormEdit} reload={() => reload(setUsers, true)} />
                </ModalPortal>
            )}
            {alert && (
                < ModalPortal type={"alert"}>
                    <Alerts Result={alert} />
                </ModalPortal >
            )
            }
        </>
    );
}
const headerUsers = new headerList()
headerUsers.addHeader("Nombre", "30%")
headerUsers.addHeader("Rol",    "30%")
headerUsers.addHeader("Correo", "30%")


const reload = (setData, wait) => {
    if (wait) {
        setTimeout(() => {
            getDataFromUrl('/getUsers')
                .then(json => setData(json))
        }, 1000);
        return
    }
    getDataFromUrl('/getUsers')
        .then(json => setData(json))
}
export default AllUser;