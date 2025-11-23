import { Navigate, Outlet } from "react-router-dom";

function AutorizedUserRoute() {

    const isAutorized = true; //TODO: заменить на проверку токена

    return isAutorized
        ? <Outlet />
        : <Navigate to="/login" replace />
}

export default AutorizedUserRoute;