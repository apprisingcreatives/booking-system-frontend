import { useContext } from "react";
import { Context as AuthContext } from "./../context/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
