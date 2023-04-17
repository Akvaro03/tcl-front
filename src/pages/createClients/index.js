import ResponsiveAppBar from "../../components/navbar";
import FormCreateClient from "./components/formCreate";
import Style from "./createClients.module.css"
function CreateClients() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.contentCreateClients}>
                <FormCreateClient />
            </div>
        </>
    );
}

export default CreateClients;