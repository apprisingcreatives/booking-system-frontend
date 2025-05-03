import { User, UserRole } from "../../models";
import {
  SET_LOGIN,
  SET_AUTH_ERROR,
  SET_LOGOUT,
  SET_SIGNUP_LOADING,
  SET_USER,
  SET_LOADING_USER,
  SET_IS_AUTHENTICATED,
  SET_LOGIN_LOADING,
  SET_USER_ROLE,
} from "./constants";

export type State = {
  user: User | null;
  isAuthenticated: boolean;
  loadingUser: boolean;
  setLoadingUser: () => void;
  getUser: () => void;
  isLoggedIn: boolean;
  authError: string;
  signupLoading: boolean;
  loginLoading: boolean;
  login: ({
    values,
    onSuccess,
    onError,
  }: {
    values: { email: string; password: string };
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
  }) => void;
  logout: () => void;
  signup: ({
    values,
    onSuccess,
    onError,
  }: {
    values: {
      email: string;
      name: string;
      password: string;
      passwordConfirm: string;
    };
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
  }) => void;
  handleSetIsAuthenticated: ({
    isAuthenticated,
  }: {
    isAuthenticated: boolean;
  }) => void;
  updateUserRole: (role: UserRole) => void;
};

export type Action =
  | {
      type: typeof SET_LOGIN;
    }
  | {
      type: typeof SET_LOGOUT;
    }
  | { type: typeof SET_USER; payload: { user: User } }
  | { type: typeof SET_SIGNUP_LOADING; payload: { loading: boolean } }
  | { type: typeof SET_AUTH_ERROR; payload: { errorMessage: string } }
  | { type: typeof SET_LOADING_USER; payload: { loading: boolean } }
  | { type: typeof SET_IS_AUTHENTICATED; isAuthenticated: boolean }
  | { type: typeof SET_LOGIN_LOADING; loading: boolean }
  | { type: typeof SET_USER_ROLE; payload: { role: UserRole } };
