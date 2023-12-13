import classToastList from "../../classes/classToastList";
import ResponsiveAppBar from "../../components/navbar";
import FormPay from "../../components/forms/formPay";
import ToastList from "../../components/toastList";
import Style from "./createFact.module.css"
import addPay from "../../db/addPay";
import { useState } from "react";

function CreateFact() {
    const [toasts, setToasts] = useState([]);
    const savePay = async (pay) => {
        try {
            addPay({ pay })
                .then(() => {
                    classToastList.addToast(setToasts, "ok Fact")
                })
        } catch (error) {
        }
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <FormPay save={savePay} missedData={() => classToastList.addToast(setToasts, { id: Date.now(), text: "missed data" })} />
            </div>
            <ToastList
                listData={toasts}
            />
        </>
    );
}

export default CreateFact;