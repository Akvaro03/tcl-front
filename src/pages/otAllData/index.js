import { useParams } from "react-router-dom";
import Style from './otAllData.module.css'
import ResponsiveAppBar from "../../components/navbar";
import ModalOt from "./components/ModalOt";

function OtAllData() {
    let params = useParams();
    console.log(params.id); // "hotspur"
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