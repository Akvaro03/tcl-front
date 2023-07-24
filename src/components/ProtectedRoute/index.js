import { Navigate } from "react-router-dom";
import getUser from "../../hooks/getUser";

function ProtectedRoute({ children, type = "Todos", newPage = "/login" }) {
    let user;
    try {
        user = getUser("roles");
        if (user && (user.includes(type) || type === "Todos")) {
            return children
        } else {
            return <Navigate to={newPage} />;
        }
    } catch (error) {
        return <Navigate to={newPage} />;
    }
}

export default ProtectedRoute;