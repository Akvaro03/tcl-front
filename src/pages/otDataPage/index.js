import permissions from "../../classes/permissions";
import ResponsiveAppBar from "../../components/navbar";
import getUser from "../../hooks/getUser";
import useOtData from "../../hooks/useOtData";
import HistoryOt from "../otAllData/components/histoyOt";
import Style from "./OtDataPage.module.css"
import CardOt from "./components/CardOt/CardOt";

function OtDataPage() {
    const { ot, changes, resetOt, handleChangeOt, handlePriority } = useOtData()
    const rol = getUser("roles");
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.bodyDataPage}>
                {ot && (
                    <CardOt ot={ot} resetOt={resetOt} handleChangeOt={handleChangeOt} handlePriority={handlePriority} />
                )}
                {changes && (
                    permissions.seeHistory(rol) && (
                        <HistoryOt history={changes} />
                    )
                )}
            </div>
        </>
    )

}

export default OtDataPage;