import classToastList from "../../classes/classToastList";
import ResponsiveAppBar from "../../components/navbar";
import FormPay from "../../components/forms/formPay";
import ToastList from "../../components/toastList";
import Style from "./createFact.module.css"
import addPay from "../../db/addPay";
import { useState } from "react";
import useFacturaOT from "../../hooks/useFacturasOt";

function CreateFact() {
    const [toasts, setToasts] = useState([]);
    const { createFactura } = useFacturaOT()
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <FormPay save={createFactura} addNotification={setToasts} />
            </div>
            <ToastList
                listData={toasts}
            />
        </>
    );
}

export default CreateFact;