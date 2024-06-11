import { Box } from "@mui/material";
import Style from "./buttonAuth.module.css"
import getUser from "../../hooks/getUser";
import permissions from "../../classes/permissions";
function ButtonAuth({ auth, onclick }) {
    const rol = getUser("roles");
    const isCanEdit = permissions.editAuth(rol)
    const styleEdit = isCanEdit ? Style.clickable : ""
    if (auth === "1") return (
        <div onClick={isCanEdit && onclick} className={`${Style.auth} ${styleEdit}`}>
            Autorizado
        </div>
    )
    return (
        <div onClick={isCanEdit && onclick} className={`${Style.noAuth} ${styleEdit}`}>
            No Autorizado
        </div>
    );
}

export default ButtonAuth;