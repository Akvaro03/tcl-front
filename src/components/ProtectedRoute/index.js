import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import getUser from "../getUser";

function ProtectedRoute({ children }) {
    const user = useSelector(userLogin => userLogin.userLogin.name)
    console.log(getUser())
    if(user){
        return children
    } else{
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;