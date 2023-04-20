import { Navigate } from "react-router-dom";
import getUser from "../getUser";

function ProtectedRoute({ children }) {
    let user;
    try {
        
        user = JSON.parse(JSON.parse(getUser()).userString);
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