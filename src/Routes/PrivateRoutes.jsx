
import { Navigate } from 'react-router-dom';





const Private_routes = ({ children }) => {
    const token = localStorage.getItem("user");

    return token ? children : <Navigate to={"/sign"} />
}
export default Private_routes;