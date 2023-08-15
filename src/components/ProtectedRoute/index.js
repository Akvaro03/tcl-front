import { Navigate } from "react-router-dom";
import getUser from "../../hooks/getUser";
import typesUsers from "../../classes/typesUsers";

function ProtectedRoute({ children, type = "Todos"}) {
    let user;
    try {
        user = getUser("roles");
        if (user && type === null) {
            return <Navigate to={typesUsers.getDefaultPage(user)} />;
        } else if (!user && type === null) {
            return children
        }
        if (type.includes(user) || type === "Todos") {
            return children
        } else if (user) {
            return <Navigate to={typesUsers.getDefaultPage(user)} />;
        }

        return <Navigate to={"/login"} />;

    } catch (error) {
        return <Navigate to={typesUsers.getDefaultPage(user)} />;
    }
}

export default ProtectedRoute;