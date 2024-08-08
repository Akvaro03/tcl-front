import { useCallback, useState } from "react";
import nameUsed from "../../db/nameUsed";
import typesUsers from "../../classes/typesUsers";
import toUppercase from "../toUppercase";

import addUser from "../../db/addUser";
import { default as userEdit } from "../../db/editUser";
import emailUsed from "../../db/emailUsed";

function useCreateUser(props = initialState, alert, funcAfterSubmit) {
    const [newUser, setNewUser] = useState({ ...props, password: "" })

    const editUser = useCallback((category, value) => {
        setNewUser(prev => ({ ...prev, [category]: value }))
    }, [])
    const isComplete = () => {
        const user = clearUser()
        const propertiesVerify = props.name[2] ? ["name", "email", "type"] : ["name", "email", "password", "type"]
        const allProperty = Object.getOwnPropertyNames(user);
        if (allProperty.length === 0) return false

        for (const data of propertiesVerify) {
            if (!allProperty.includes(data)) {
                return false
            }
        }
        return true; // Retorna true si todas las propiedades están presentes
    }
    const clearUser = () => {
        const user = { ...newUser }
        for (let key in user) {
            if (user.hasOwnProperty(key)) {
                if (user[key] === null || user[key] === "" || (Array.isArray(user[key]) && user[key].length === 0)) {
                    delete user[key];
                }
            }
        }
        return user
    }
    const onSubmitUser = async (e) => {
        e.preventDefault()
        if (!isComplete()) {
            alert("missed data")
            return
        }
        const isNameUsed = await nameUsed(newUser.name, "user")
        const isNameEmail = await emailUsed(newUser.email)
        
        if ((isNameEmail && !props.name[2]) || (isNameEmail && newUser.email !== props?.email)) {
            alert("email used")
            return
        }
        if ((isNameUsed && !props.name[2]) || (isNameUsed && newUser.name !== props?.name)) {
            alert("name used")
            return
        }
        if (!props.name[2]) {
            addUser(newUser).then(result => alert(result.result))
        } else {
            userEdit(newUser)
        }

        funcAfterSubmit()
    }

    return { newUser, editUser, onSubmitUser }
}

const initialState = {
    name: "",
    email: "",
    password: "",
    state: "",
    type: typesUsers.Colaborador
}
export default useCreateUser;