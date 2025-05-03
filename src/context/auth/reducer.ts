import {
  SET_AUTH_ERROR,
  SET_IS_AUTHENTICATED,
  SET_LOADING_USER,
  SET_LOGIN,
  SET_LOGIN_LOADING,
  SET_LOGOUT,
  SET_SIGNUP_LOADING,
  SET_USER,
  SET_USER_ROLE,
} from "./constants";
import { Action, State } from "./types";

export const reducer = (state: State, action: Action) => {
  const { type } = action;

  switch (type) {
    case SET_LOGIN: {
      return { ...state, isLoggedIn: true, isAuthentiicated: true };
    }

    case SET_LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        authError: "",
      };
    }

    case SET_USER: {
      const { user: currentUser } = action.payload;
      return { ...state, user: currentUser };
    }

    case SET_SIGNUP_LOADING: {
      const { loading } = action.payload;

      return { ...state, signupLoading: loading };
    }

    case SET_AUTH_ERROR: {
      const { errorMessage } = action.payload;
      return { ...state, authError: errorMessage };
    }

    case SET_LOADING_USER: {
      const { loading } = action.payload;

      return { ...state, loadingUser: loading };
    }

    case SET_IS_AUTHENTICATED: {
      const { isAuthenticated } = action;
      return { ...state, isAuthenticated, isLoggedIn: true };
    }

    case SET_LOGIN_LOADING: {
      const { loading } = action;
      return { ...state, loginLoading: loading };
    }

    case SET_USER_ROLE: {
      const { role } = action.payload;

      return {
        ...state,
        user: state.user ? { ...state.user, role } : null,
      };
    }
    default:
      return state;
  }
};
