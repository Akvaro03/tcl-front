import Style from './otAllData.module.css'
import ResponsiveAppBar from "../../components/navbar";
import ModalOt from "./components/ModalOt";

function OtAllData() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentPageOt}>
                <ModalOt />
            </div>
        </>
    );
}

export default OtAllData;