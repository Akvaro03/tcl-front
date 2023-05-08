import { Button, TextField } from "@mui/material";
import ResponsiveAppBar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../../components/modelPortal";
import { useState } from "react";
import saveLogin from "../../hooks/saveLogin";
import Alerts from "../../components/alerts";
import Style from './login.module.css'
import postData from "../../hooks/postData";

function LoginPage() {
    const [Email, SetEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Result, SetResult] = useState(null)
    const navigate = useNavigate();
    /**
     * Iniciar Sesion con el usuario
     * @param {Event} e 
     */
    const onLogin = (e) => {
        e.preventDefault();
        /**
         * usuario a iniciar sesion
         */
        let user = {
            email: Email,
            password: Password
        }
        postData('http://localhost:4000/login', user)
            .then(json => checkResult(SetResult, json))
        setTimeout(() => {
            navigate("/OtAsingPages");
        }, "1500");
    }
    /**
     * Manejar state email
     * @param {HTMLElement} param0 
     */
    const onChangeEmail = ({ target }) => {
        SetEmail(target.value)
    }
    /**
     * Manejar state password
     * @param {HTMLElement} param0 
     */
    const onChangePassword = ({ target }) => {
        setPassword(target.value)
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentLogin}>
                <div className={Style.Login}>
                    <div className={Style.Tittle}>
                        <p>Iniciar sesion en tu cuenta</p>
                    </div>
                    <div className={Style.FormLogin}>
                        <div className={Style.ContentEmail}>
                            <TextField onChange={onChangeEmail} fullWidth id="outlined-basic" label="Email" variant="outlined" />
                        </div>
                        <div className={Style.ContentPassword}>
                            <TextField onChange={onChangePassword} fullWidth id="outlined-basic" label="Password" variant="outlined" />
                        </div>
                        <div className={Style.ContentButton}>
                            <Button onClick={onLogin} fullWidth variant="contained">Iniciar Sesion</Button>
                        </div>
                    </div>
                </div>
            </div>
            {Result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={Result.result} Email={Email} hash={Result.hash} />
                </ModalPortal>
            )}
        </>
    );
}
const checkResult = (SetResult, result) => {
    SetResult(result);
    saveLogin(result.user)
}

export default LoginPage;