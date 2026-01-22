import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../auth/store/auth.store";

export const AuthenticatedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const authStatus = useAuthStore((state) => state.authStatus);

  if(authStatus === 'checking') return null;
  
  if(!isAuth){
    return <Navigate to="/auth/login" replace/>;
  }

  return <Outlet />;
}

export const NotAuthenticatedRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const authStatus = useAuthStore((state) => state.authStatus);

  if(authStatus === 'checking') return null;
  
  if(isAuth){
    return <Navigate to="/" replace/>;
  }

  return <Outlet />;
};