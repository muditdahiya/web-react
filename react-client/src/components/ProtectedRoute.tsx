import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../context/Auth';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  if (!auth.isLoggedIn) {
    return <Navigate to='/Login' replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;