import ResponsiveAppBar from "../../components/navbar";
import ModuleConfiguration from "./components/moduleConfiguration";
import Style from "./configurationPage.module.css"
function ConfigurationPage() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.bodyConfiguration}>
                <ModuleConfiguration />
            </div>
        </>
    );
}

export default ConfigurationPage;