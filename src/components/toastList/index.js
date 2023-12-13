import Style from "./toastList.module.css"
import Alerts from "../alerts";
export default function ToastList({ listData }) {
    return (
        <div
            className={Style.toastList}
            aria-live="assertive"
        >
            {listData.map((toast) => (
                <Alerts Result={toast.text} />
            ))}
        </div>

    )
}

