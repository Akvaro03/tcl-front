import ResponsiveAppBar from "../../components/navbar";
import ModalPortal from "../../components/modelPortal";
import FormPay from "../../components/forms/formPay";
import Alerts from "../../components/alerts";
import Style from "./createFact.module.css"
import addPay from "../../db/addPay";
import { useState } from "react";

function CreateFact() {
    const [result, setResult] = useState()
    const savePay = async (pay) => {
        try {
            addPay({ pay })
                .then(result => {
                    setResult(result)
                    setTimeout(() => {
                        setResult()
                    }, 2000);
                })
        } catch (error) {
        }
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <FormPay save={savePay} />
            </div>
            {result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={result} />
                </ModalPortal>
            )}
        </>
    );
}

export default CreateFact;