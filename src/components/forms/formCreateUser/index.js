import { Button, Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import inputClass from "../../../classes/inputClass";
import toUppercase from "../../../hooks/toUppercase";
import typesUsers from "../../../classes/typesUsers";
import { useEffect, useRef, useState } from 'react';
import { closeEsc } from "../../../hooks/closeEsc";
import Style from "./formCreateUser.module.css"
import nameUsed from "../../../db/nameUsed";
import ModalPortal from "../../modelPortal";
import editUser from "../../../db/editUser";
import addUser from "../../../db/addUser";
import Alerts from "../../alerts";
import OneSelect from "../../oneSelect";
function FormCreateUser({ close, reload, user }) {
    const divRef = useRef(null);
    const [rolSelect, setRolSelect] = useState(user ? JSON.parse(user.type)[0] : "")
    const [emailUser, setEmailUser] = useState(user ? user.email : "")
    const [stateUser, setStateUser] = useState(user ? user.state : "")
    const [nameUser, setNameUser] = useState(user ? user.name : "")
    const [passwordUser, setPasswordUser] = useState("")
    const [Result, setResult] = useState()
    useEffect(() => {

        const divElement = divRef.current;
        if (divElement) {
            divElement.addEventListener('keydown', e => closeEsc(e, close));
        }
        return () => {
            divElement.removeEventListener('keydown', closeEsc);
        };
    }, [close])

    const handleChange = (event) => {
        const { name } = event.target
        setRolSelect(name)
    };
    const handleState = () => {
        if (stateUser === "active") {
            setStateUser("disable")
            return
        }
        setStateUser("active")
    }
    const onSubmit = async () => {
        if ((!nameUser || !emailUser || !rolSelect) && (!user && !passwordUser)) {
            setResult({ result: "missed data" })
            return
        }
        const isNameUsed = await nameUsed(nameUser, "user")
        if (!isNameUsed || nameUser === user.name) {
            const data = {
                name: toUppercase(nameUser),
                type: [rolSelect],
                email: emailUser,
                password: passwordUser,
                state: stateUser
            }
            if (!user) {
                addUser(data).then(result => setResult(result))
            } else {
                data.id = user.id
                editUser(data)
            }
            setTimeout(() => {
                setResult()
            }, 3200);
            resetAllData()
            reload()
            close()
            return
        }
        setResult({ result: "name used" })
        setTimeout(() => {
            setResult()
        }, 3200);
    }
    const resetAllData = () => {
        setNameUser("")
        setPasswordUser("")
        setEmailUser("")
        setRolSelect(rolesUser.map(datoos => { return { name: datoos, state: false } }))
    }
    const inputUser = new inputClass(onSubmit)
    return (
        <div ref={divRef} tabIndex={0} className={Style.formCreateUser}>
            <div className={Style.headerTittle}>
                <p>{user ? "Editar usuario" : "Crear Nuevos usuarios"}</p>
            </div>
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
                    ) : (<></>)}
                    <div className={Style.input}>
                        <div className={Style.inputTittle}>
                            <p>Rol:</p>
                        </div>
                        <OneSelect value={rolSelect} factors={rolesUser} onchange={setRolSelect} />
                    </div>
                </div>
                <div className={Style.Buttons} >
                    <Button onClick={() => close(false)} variant="outlined" color="success" >Cancelar</Button>
                    <Button onClick={() => onSubmit()} variant="contained" color="success" >{!user ? "Crear usuario" : "Guardar"}</Button>
                </div>
            </div>
            {Result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={Result.result} />
                </ModalPortal>
            )}
        </div>
    );
}


const rolesUser = [typesUsers.Admin, typesUsers.AdminSystem, typesUsers.Director, typesUsers.Trabajador]

export default FormCreateUser;