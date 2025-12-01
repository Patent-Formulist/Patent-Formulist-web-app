import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import authService from '../services/auth/authService';

function AuthorizedUserRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const ok = await authService.validate();
        setIsAuthorized(ok);
      } catch {
        setIsAuthorized(false);
      }
    };
    check();
  }, []);

  if (isAuthorized === null) {
    return <div>Проверка авторизации...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthorizedUserRoute;