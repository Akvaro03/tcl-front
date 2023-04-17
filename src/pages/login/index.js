import { Button, TextField } from "@mui/material";
import ResponsiveAppBar from "../../components/navbar";
import Style from './login.module.css'
import { useState } from "react";
import ModalPortal from "../../components/modelPortal";
import Alerts from "../../components/alerts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/userLogin/userLoginSlice";

function LoginPage() {
    const [Email, SetEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Result, SetResult] = useState(null)
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogin = (e) => {
        e.preventDefault();
        let user = {
            email: Email,
            password: Password
        }
        fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => checkResult(SetResult, json,Dispatch))
        setTimeout(() => {
            navigate("/OtAsingPages");
        }, "1500");
    }
    const onChangeEmail = ({ target }) => {
        SetEmail(target.value)
    }
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
const checkResult = (SetResult, result, Dispatch) => {
    console.log(result)
    SetResult(result);
    Dispatch(addUser(result.user))
}

export default LoginPage;