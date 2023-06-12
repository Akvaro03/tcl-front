import { Navigate } from "react-router-dom";
import getUser from "../../hooks/getUser";

function ProtectedRoute({ children }) {
    let user;
    try {
        
        user = getUser();
    } catch (error) {
        console.log(error)
    }
    if (user) {
        return children
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;