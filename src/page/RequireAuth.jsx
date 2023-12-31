import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import Spinners from "../components/ui/Spinners";

const RequireAuth = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, [auth, refresh]);

  // const { auth } = useAuth();
  // return <>{auth.username ? <Outlet /> : <Navigate to="/login" replace />}</>;
  return (
    <>
      {auth.username ? (
        <Outlet />
      ) : isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <Spinners />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
};

export default RequireAuth;
