import { Navigate } from "react-router-dom";
import getUser from "../../hooks/getUser";

function ProtectedRoute({ children, type = "Todos", newPage = "/login" }) {
    let user;
    try {
        user = getUser("roles");
        if (user && type === null) {
            return <Navigate to={newPage} />;
        } else if (!user && type === null) {
            return children
        }
        if (type.includes(user) || type === "Todos") {
            return children
        } else if (user) {
            return <Navigate to={newPage} />;
        }

        return <Navigate to={"/login"} />;

    } catch (error) {
        return <Navigate to={newPage} />;
    }
}

export default ProtectedRoute;