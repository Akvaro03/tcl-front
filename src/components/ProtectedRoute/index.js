import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const user = useSelector(userLogin => userLogin.userLogin.name)

    if(user){
        return children
    } else{
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;