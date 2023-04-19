import { Navigate } from "react-router-dom";
import getUser from "../getUser";

function ProtectedRoute({ children }) {
    const user = JSON.parse(JSON.parse(getUser()).userString);
    if (user) {
        return children
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;