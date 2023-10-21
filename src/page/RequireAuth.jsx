import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const RequireAuth = () => {
  const { auth } = useAuth();
  return <>{auth.username ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
};

export default RequireAuth;
