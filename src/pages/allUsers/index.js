import ResponsiveAppBar from "../../components/navbar";
import ListUsers from "./components/ListUsers";
import Style from "./allUsers.module.css"
function AllUser() {
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentUsers}>
                <ListUsers />
            </div>
        </>
    );
}

export default AllUser;