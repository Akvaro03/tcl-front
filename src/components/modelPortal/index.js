import ReactDOM from "react-dom";
import Styles from "./modelPortal.module.css"

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
            <div className={Styles.containerForm}>
                {children}
            </div>,
            document.getElementById('portal')
        )
    }
}

export default ModalPortal;