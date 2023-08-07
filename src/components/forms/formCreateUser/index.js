import { Button, Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { blue, grey } from '@mui/material/colors';

import Style from "./formCreateUser.module.css"
import { forwardRef, useState } from 'react';
import styled from '@emotion/styled';
import Input from '@mui/base/Input';
import Alerts from "../../alerts";
import nameUsed from "../../../db/nameUsed";
import ModalPortal from "../../modelPortal";
import toUppercase from "../../../hooks/toUppercase";
import postData from "../../../db/postData";
import typesUsers from "../../../classes/typesUsers";
function FormCreateUser({ close, reload }) {
    const [passwordUser, setPasswordUser] = useState("")
    const [rolSelect, setRolSelect] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [nameUser, setNameUser] = useState("")
    const [Result, setResult] = useState()
    const handleChange = (event) => {
        const { name } = event.target
        setRolSelect(name)
    };
    const onSubmit = async () => {
        if (!nameUser || !emailUser || !passwordUser || !rolSelect) {
            setResult({ result: "missed data" })
            return
        }
        const isNameUsed = await nameUsed(nameUser, "user")
        if (!isNameUsed) {
            postData("http://localhost:4000/postUsers", {
                name: toUppercase(nameUser),
                type: [rolSelect],
                email: emailUser,
                password: passwordUser
            })
                .then(result => setResult(result))
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
    return (
        <div className={Style.formCreateUser}>
            <div className={Style.headerTittle}>
                <p>Crear Nuevos usuarios</p>
            </div>
            <div className={Style.formCreate}>
                <div className={Style.inputsForm}>
                    <div className={Style.input}>
                        <div className={Style.inputTittle}>
                            <p>Nombre del usuario</p>
                        </div>
                        <CustomInput value={nameUser} onChange={e => setNameUser(e)} />
                    </div>
                    <div className={Style.input}>
                        <div className={Style.inputTittle}>
                            <p>Email del usuario</p>
                        </div>
                        <CustomInput value={emailUser} onChange={e => setEmailUser(e)} />
                    </div>
                    <div className={Style.input}>
                        <div className={Style.inputTittle}>
                            <p>Contraseña del usuario</p>
                        </div>
                        <CustomInput value={passwordUser} onChange={e => setPasswordUser(e)} />
                    </div>
                </div>
                <div className={Style.selectRoles}>
                    <div className={Style.tittleRoles}>
                        <p>Selecciona los roles del usuario</p>
                    </div>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                            {rolesUser.map((nameRole, key) => {
                                return <FormControlLabel
                                    key={key}
                                    control={
                                        <Checkbox checked={nameRole === rolSelect} onChange={handleChange} name={nameRole} />
                                    }
                                    label={nameRole}
                                />
                            }

                            )}
                        </FormGroup>
                    </FormControl>
                </div>
                <div className={Style.Buttons} >
                    <Button onClick={() => close(false)} variant="outlined" color="success" >Cancelar</Button>
                    <Button onClick={onSubmit} variant="contained" color="success" >Crear usuario</Button>
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


const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 80%;
    height: 5px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${grey[900]};
    background: ${'#fff'};
    border: 1px solid ${grey[400]};
    box-shadow: 0px 2px 2px ${grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const CustomInput = forwardRef(function CustomInput(props, ref) {
    let value = props.value;
    let onChange = props.onChange;
    return (
        <Input
            value={value}
            onChange={({ target: { value } }) => {
                onChange(value)
            }}
            slots={{ input: StyledInputElement }}
            ref={ref} />
    );
});
const rolesUser = [typesUsers.Admin, typesUsers.AdminSystem, typesUsers.Director, typesUsers.Trabajador]

export default FormCreateUser;