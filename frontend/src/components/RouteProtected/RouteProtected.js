import { Navigate } from "react-router-dom"

const RouteProtected = (props) => {
    const token = localStorage.getItem("token");

    return (
        token ? props.route : <Navigate to="/home/signin" />
    );
}

export default RouteProtected;