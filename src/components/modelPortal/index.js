import ReactDOM from "react-dom";
import Styles from "./modelPortal.module.css"
import { Fade } from "@mui/material";

/**
 * 
 * @param {ComponentElement} children 
 * @param {string} type 
 * @returns component
 */
function ModalPortal({ children, type }) {
    if (type === "alert") {
        return ReactDOM.createPortal(
            <div className={Styles.containerAlert}>
                {children}
            </div>,
            document.getElementById('portal')
        )
    } else if (type === "form") {
        return ReactDOM.createPortal(
            <Fade in={true}>
                <div className={Styles.containerForm}>
                    {children}
                </div>
            </Fade>,

            document.getElementById('portal')
        )
    }
}

export default ModalPortal;