import useCreateUser from "../../../hooks/useCreateUser";
import inputClass from "../../../classes/inputClass";
import typesUsers from "../../../classes/typesUsers";
import { Button, Checkbox } from "@mui/material";
import FormPrototype from "../../formPrototype";
import deleteUser from "../../../db/deleteUser";
import Style from "./formCreateUser.module.css";
import OneSelect from "../../oneSelect";
function FormCreateUser({ close, user, alert }) {
    const { newUser, editUser, onSubmitUser } = useCreateUser(user, alert, close)

    const handleState = () => {
        if (newUser.state === "active") {
            editUser("state", "disable")
            return
        }
        editUser("state", "active")
    }
    const onDelete = () => {
        deleteUser({ id: user.id })
        close()
    }
    const inputUser = new inputClass(onSubmitUser)
    return (
        <FormPrototype onDelete={user ? onDelete : null} close={close} tittle={user ? "Editar usuario" : "Crear Nuevos usuarios"} >
            <form onSubmit={onSubmitUser}>
                <div className={Style.formCreate}>
                    <div className={Style.inputsForm}>
                        {user ? (
                            <div className={Style.input}>
                                <Checkbox sx={{ margin: "0px", padding: "0px" }}
                                    checked={newUser.state === "active"}
                                    onChange={handleState}
                                    name={"Estado"} />
                                <p>Habilitado</p>
                            </div>
                        ) : (<></>)}
                        <div className={Style.input}>
                            <div className={Style.inputTittle}>
                                <p>Nombre:</p>
                            </div>
                            {inputUser.getInput(newUser.name, (e) => editUser("name", e))}
                        </div>
                        <div className={Style.input}>
                            <div className={Style.inputTittle}>
                                <p>Correo:</p>
                            </div>
                            {inputUser.getInput(newUser.email, (e) => editUser("email", e), "email")}
                        </div>
                        <div className={Style.input}>
                            <div className={Style.inputTittle}>
                                {!user ? (
                                    <p>Contraseña:</p>
                                ) : (
                                    <p>Nueva contraseña:</p>
                                )}
                            </div>
                            {inputUser.getInput(newUser.password, (e) => editUser("password", e))}
                        </div>
                        <div className={Style.input}>
                            <div className={Style.inputTittle}>
                                <p>Rol:</p>
                            </div>
                            <OneSelect value={newUser.type} factors={rolesUser} onchange={(e) => editUser("type", e)} />
                        </div>
                    </div>
                    <div className={Style.Buttons} >
                        <Button variant="outlined" onClick={() => close(false)} >Cancelar</Button>
                        <Button variant="contained" type="submit" >{!user ? "Crear usuario" : "Guardar"}</Button>
                    </div>
                </div>
            </form>
        </FormPrototype>
    );
}


const rolesUser = [typesUsers.Admin, typesUsers.AdminSystem, typesUsers.Director, typesUsers.Colaborador]

export default FormCreateUser;