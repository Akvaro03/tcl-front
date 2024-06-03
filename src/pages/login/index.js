import { Button, FilledInput, FormControl, IconButton, TextField } from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { sendDataEnter } from "../../hooks/sendDataEnter";
import Visibility from '@mui/icons-material/Visibility';
import ResponsiveAppBar from "../../components/navbar";
import ModalPortal from "../../components/modelPortal";
import typesUsers from "../../classes/typesUsers";
import { useNavigate } from "react-router-dom";
import saveLogin from "../../hooks/saveLogin";
import Alerts from "../../components/alerts";
import getUser from "../../hooks/getUser";
import Style from './login.module.css'
import login from "../../db/login";
import { useState } from "react";
import ToastList from "../../components/toastList";
import classToastList from "../../classes/classToastList";

function LoginPage() {
    const [Email, SetEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    
    const [toasts, setToasts] = useState([])
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();
    const onLogin = () => {
        if (!Email || !Password) {
            classToastList.addToast(setToasts, "missed data")
            return
        }
        let user = {
            email: Email,
            password: Password
        }
        login(user)
            .then(json => checkResult(json))
            .then(text => classToastList.addToast(setToasts, text))
        setTimeout(async () => {
            const url = await typesUsers.getDefaultPage(getUser("roles"))
            navigate(url);
        }, "1000");
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
                            <TextField onKeyDown={(e) => sendDataEnter(e, onLogin)} autoFocus onChange={onChangeEmail} fullWidth id="outlined-basic" label="Email" variant="outlined" />
                        </div>
                        <div className={Style.ContentPassword}>
                            <FormControl sx={{ width: '100%' }} variant="filled">
                                <FilledInput
                                    onChange={onChangePassword}
                                    onKeyDown={(e) => sendDataEnter(e, onLogin)}
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>



                        </div>
                        <div className={Style.ContentButton}>
                            <Button onClick={onLogin} fullWidth variant="contained">Iniciar Sesion</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastList
                listData={toasts}
            />
        </>
    );
}
const checkResult = (result) => {
    saveLogin(result.user)
    return result.result;
}

export default LoginPage;