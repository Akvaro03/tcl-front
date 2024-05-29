import Style from "./toastList.module.css"
import Alerts from "../alerts";
export default function ToastList({ listData }) {
    return (
        <div
            className={listData[0] ? Style.toastListActivated : Style.toastList}
            aria-live="assertive"
        >
            {listData.map((toast, index) => (
                <Alerts text={toast.text} key={index} />
            ))}
        </div>

    )
}

