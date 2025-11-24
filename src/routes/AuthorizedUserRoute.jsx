import { Navigate, Outlet } from "react-router-dom";

import authService from '../services/auth/authService'

function AuthorizedUserRoute() {
    const userAccessToken = authService.getToken();
    const isAuthorized = Boolean(userAccessToken) && userAccessToken.length > 10;

    return isAuthorized
        ? <Outlet />
        : <Navigate to="/login" replace />
}

export default AuthorizedUserRoute;