import Style from './otAllData.module.css'
import ResponsiveAppBar from "../../components/navbar";
import ModalOt from "./components/ModalOt";
import DataOt from './components/dataOt';
import HistoryOt from './components/histoyOt';

function OtAllData() {
    const style = false;
    return (
        <>
            <ResponsiveAppBar />
            {style ? (

                <div className={Style.ContentPageOt}>
                    <ModalOt />
                </div>
            ) : (
                <div className={Style.ContentAllData}>
                    <DataOt />
                    <HistoryOt />
                </div>
            )}
        </>
    );
}

export default OtAllData;