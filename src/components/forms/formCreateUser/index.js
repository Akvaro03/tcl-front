import inputClass from "../../../classes/inputClass";
import toUppercase from "../../../hooks/toUppercase";
import typesUsers from "../../../classes/typesUsers";
import { Button, Checkbox } from "@mui/material";
import FormPrototype from "../../formPrototype";
import Style from "./formCreateUser.module.css"
import nameUsed from "../../../db/nameUsed";
import editUser from "../../../db/editUser";
import addUser from "../../../db/addUser";
import OneSelect from "../../oneSelect";
import { useState } from 'react';
import deleteUser from "../../../db/deleteUser";
function FormCreateUser({ close, reload, user, alert }) {
    const [rolSelect, setRolSelect] = useState(user ? JSON.parse(user.type)[0] : "")
    const [emailUser, setEmailUser] = useState(user ? user.email : "")
    const [stateUser, setStateUser] = useState(user ? user.state : "")
    const [nameUser, setNameUser] = useState(user ? user.name : "")
    const [passwordUser, setPasswordUser] = useState("")

    const handleState = () => {
        if (stateUser === "active") {
            setStateUser("disable")
            return
        }
        setStateUser("active")
    }
    const onSubmit = async () => {
        if ((!nameUser || !emailUser || !rolSelect) && (!user && !passwordUser)) {
            alert("missed data")
            setTimeout(() => {
                alert()
            }, 1500);
            return
        }
        const isNameUsed = await nameUsed(nameUser, "user")
        if (!isNameUsed || (user && nameUser === user.name)) {
            const data = {
                name: toUppercase(nameUser),
                type: [rolSelect],
                email: emailUser,
                password: passwordUser,
                state: stateUser
            }
            if (!user) {
                addUser(data).then(result => alert(result.result))
            } else {
                data.id = user.id
                editUser(data)
            }
            setTimeout(() => {
                alert()
            }, 3200);
            resetAllData()
            reload()
            close()
            return
        }
        alert("name used")
        setTimeout(() => {
            alert()
        }, 1500);
    }
    const resetAllData = () => {
        setNameUser("")
        setPasswordUser("")
        setEmailUser("")
        setRolSelect(rolesUser.map(datoos => { return { name: datoos, state: false } }))
    }
    const onDelete = () => {
        deleteUser({ id: user.id })
        reload()
        close()
    }
    const inputUser = new inputClass(onSubmit)
    return (
        <FormPrototype onDelete={onDelete} close={close} tittle={user ? "Editar usuario" : "Crear Nuevos usuarios"} >
            <div className={Style.formCreate}>
                <div className={Style.inputsForm}>
                    {user ? (
                        <div className={Style.input}>
                            <Checkbox sx={{ margin: "0px", padding: "0px" }} checked={stateUser === "active"} onChange={handleState} name={"Estado"} />
                            <p>Habilitado</p>
                        </div>
                    ) : (<></>)}
                    <div className={Style.input}>
                        <div className={Style.inputTittle}>
                            <p>Nombre:</p>
                        </div>
                        {inputUser.getInput(nameUser, (e) => setNameUser(e))}
                    </div>
                    <div className={Style.input}>
                        <div className={Style.inputTittle}>
                            <p>Correo:</p>
                        </div>
                        {inputUser.getInput(emailUser, (e) => setEmailUser(e))}
                    </div>
                    {!user ? (
                        <div className={Style.input}>
                            <div className={Style.inputTittle}>
                                <p>Contraseña:</p>
                            </div>
                            {inputUser.getInput(passwordUser, (e) => setPasswordUser(e))}
                        </div>
                    ) : (
                        <div className={Style.input}>
                            <div className={Style.inputTittle}>
                                <p>Nueva contraseña:</p>
                            </div>
                            {inputUser.getInput(passwordUser, (e) => setPasswordUser(e))}
                        </div>
                    )}
                    <div className={Style.input}>
                        <div className={Style.inputTittle}>
                            <p>Rol:</p>
                        </div>
                        <OneSelect value={rolSelect} factors={rolesUser} onchange={setRolSelect} />
                    </div>
                </div>
                <div className={Style.Buttons} >
                    <Button variant="outlined" onClick={() => close(false)} >Cancelar</Button>
                    <Button variant="contained" onClick={() => onSubmit()} >{!user ? "Crear usuario" : "Guardar"}</Button>
                </div>
            </div>
        </FormPrototype>
    );
}


const rolesUser = [typesUsers.Admin, typesUsers.AdminSystem, typesUsers.Director, typesUsers.Colaborador]

export default FormCreateUser;