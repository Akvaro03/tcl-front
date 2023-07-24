import ResponsiveAppBar from "../../components/navbar";
import SelectConfig from "./components/selectConfig";
import Style from "./configurationPage.module.css"
function ConfigurationPage() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.bodyConfiguration}>
                <SelectConfig />
            </div>
        </>
    );
}

export default ConfigurationPage;