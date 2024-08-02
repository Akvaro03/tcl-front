import Style from "./buttonAuth.module.css"
import getUser from "../../hooks/getUser";
import permissions from "../../classes/permissions";
function ButtonAuth({ auth, onclick }) {
    const rol = getUser("roles");
    const isCanEdit = permissions.editAuth(rol)
    const styleEdit = isCanEdit ? Style.clickable : ""

    const handleClick = isCanEdit ? onclick : null;


    if (auth === "1") return (
        <div onClick={handleClick} className={`${Style.auth} ${styleEdit}`}>
            Autorizado
        </div>
    )
    if (auth === "-1") return (
        <div className={`${Style.canceled} ${styleEdit}`}>
            Anulada
        </div>
    )
    return (
        <div onClick={handleClick} className={`${Style.noAuth} ${styleEdit}`}>
            No Autorizado
        </div>
    );
}

export default ButtonAuth;