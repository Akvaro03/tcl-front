import ResponsiveAppBar from "../../components/navbar";
import Style from "./createTypeOt.module.css"
import FormCreateType from "./components/formCreateType";

function CreateTypeOt() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.contentCreateType}>
                <FormCreateType />
            </div>
        </>
    );
}

export default CreateTypeOt;