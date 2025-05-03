import { State } from "./types";

export const initialState: State = {
  user: null,
  isLoggedIn: false,
  authError: "",
  login: () => {},
  logout: () => {},
  signup: () => {},
  signupLoading: false,
  loginLoading: false,
  loadingUser: false,
  setLoadingUser: () => {},
  getUser: () => {},
  isAuthenticated: false,
  handleSetIsAuthenticated: () => {},
  updateUserRole: () => {},
};
