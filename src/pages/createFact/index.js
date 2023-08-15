import ResponsiveAppBar from "../../components/navbar";
import AddPay from "../otAllData/components/addPay";
import Style from "./createFact.module.css"
import addPay from "../../db/addPay";

function CreateFact() {
    const savePay = (pay) => {
        try {
            addPay({ pay })
        } catch (error) {
        }
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.BodyCreateOt}>
                <AddPay save={savePay} />
            </div>
        </>
    );
}

export default CreateFact;