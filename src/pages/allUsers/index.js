import ResponsiveAppBar from "../../components/navbar";
import AddIcon from '@mui/icons-material/Add';
import Style from "./allUsers.module.css"
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
import ModalPortal from "../../components/modelPortal";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import ListUsersComponent from "../../components/list/listUsersComponent";
import FormCreateUser from "../../components/forms/formCreateUser";

function AllUser() {
    const [isForm, setIsForm] = useState()
    const [isFormEdit, setIsFormEdit] = useState()
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
                <ListUsersComponent setEdit={setIsFormEdit} Users={Users} reload={() => reload(setUsers, true)} />
            </div>
            <Fab onClick={() => setIsForm(true)} color="primary" aria-label="add" sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                <AddIcon />
            </Fab>
            {isForm && (
                <ModalPortal type={"form"}>
                    <FormCreateUser close={setIsForm} reload={() => reload(setUsers, true)} />
                </ModalPortal>
            )}
            {isFormEdit && (
                <ModalPortal type={"form"}>
                    <FormCreateUser user={isFormEdit} close={setIsFormEdit} reload={() => reload(setUsers, true)} />
                </ModalPortal>
            )}
        </>
    );
}
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