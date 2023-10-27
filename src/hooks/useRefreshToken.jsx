import useAuth from "./useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });
      console.log({ response });
      setAuth((prev) => {
        // console.log({ prevToken: prev.accessToken });
        // console.log({ newToken: response.data.data.accessToken });
        // const accessToken = response.data.data.accessToken;
        // const roles = response.data.data.roles;
        // const user = response.data.data.user;
        const data = response.data.data;
        return { ...prev, ...data };
      });
      return response.data.data.accessToken;
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  return refresh;
};

export default useRefreshToken;
