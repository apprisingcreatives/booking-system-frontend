import { useContext } from "react";
import { Context } from "../context/SnackbarContext";

const useSnackbar = () => {
  return useContext(Context);
};

export default useSnackbar;
