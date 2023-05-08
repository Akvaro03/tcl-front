import ResponsiveAppBar from "../../components/navbar";
import FormCreateUser from "./components/formCreateUser";
import Style from "./createUser.module.css"

function CreateUser() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.contentCreateUser}>
                <FormCreateUser />
            </div>
        </>
    );
}

export default CreateUser;