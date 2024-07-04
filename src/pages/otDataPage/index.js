import permissions from "../../classes/permissions";
import ResponsiveAppBar from "../../components/navbar";
import ToastList from "../../components/toastList";
import getUser from "../../hooks/getUser";
import useOtData from "../../hooks/useOtData";
import HistoryOt from "../otAllData/components/histoyOt";
import Style from "./OtDataPage.module.css"
import CardOt from "./components/CardOt/CardOt";
import EditOt from "./components/EditOt";

function OtDataPage() {
    const { ot, changes, messageList, isEditing, handleEditingOt, resetOt, handleChangeOt, handlePriority } = useOtData()
    const rol = getUser("roles");
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.bodyDataPage}>
                {ot && (
                    <CardOt ot={ot} isEditing={isEditing} handleChangeOt={handleChangeOt} handlePriority={handlePriority} />
                )}
                {changes && (
                    permissions.seeHistory(rol) && (
                        <HistoryOt history={changes} />
                    )
                )}
            </div>
            <EditOt edit={isEditing} handleEdit={handleEditingOt} />
            <ToastList
                listData={messageList}
            />
        </>
    )

}

export default OtDataPage;