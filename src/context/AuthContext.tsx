/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useReducer,
} from 'react';
import { API_URL } from '../constants/api';

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
} from './auth/constants';
import { initialState } from './auth/initialState';
import { clearTokens, setTokens } from '../services/localStorage';
import guestClient from '../services/guestClient';
import authClient from '../services/authClient';
import { reducer } from './auth/reducer';
import {
  ApiErrorResponse,
  ApiMessageResponse,
} from '../models/common/apiResponse';
import { User, UserRole } from '../models';

export const Context = createContext(initialState);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ProviderProps = {};

export const Provider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSetUser = (user: User | null) => {
    dispatch({ type: SET_USER, payload: { user: user as User } });
  };

  const setLoadingUser = (loading: boolean) => {
    dispatch({ type: SET_LOADING_USER, payload: { loading } });
  };

  const handleSetIsAuthenticated = ({
    isAuthenticated,
  }: {
    isAuthenticated: boolean;
  }) => {
    dispatch({ type: SET_IS_AUTHENTICATED, isAuthenticated });
  };

  const loginError = ({ errorMessage }: { errorMessage: string }) => {
    dispatch({ type: SET_AUTH_ERROR, payload: { errorMessage } });
  };

  const handleSignupLoading = (loading: boolean) => {
    dispatch({ type: SET_SIGNUP_LOADING, payload: { loading } });
  };

  const setLoginLoading = (loading: boolean) => {
    dispatch({ type: SET_LOGIN_LOADING, loading });
  };

  const updateUserRole = (role: UserRole) => {
    dispatch({ type: SET_USER_ROLE, payload: { role } });
  };
  const getUser = useCallback(async () => {
    setLoadingUser(true);
    try {
      const res = await authClient.get('/users/me');
      const { status, data } = res || {};

      if (status === 200) {
        if (data) {
          handleSetUser(data.user);
          handleSetIsAuthenticated({ isAuthenticated: true });
          setLoadingUser(false);
          return;
        }
      }
      setLoadingUser(false);
    } catch (error) {
      console.error('Unable to get user.', error);
      setLoadingUser(false);
      const err = error as ApiErrorResponse;
      loginError({ errorMessage: err.data.message });
    }
  }, []);

  const login = async ({
    values,
    onSuccess,
    onError,
  }: {
    values: { email: string; password: string };
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
  }) => {
    setLoginLoading(true);
    try {
      const res = await guestClient.post(`${API_URL}/auth/login`, values, {
        withCredentials: true,
      });

      if (res && res.status === 200) {
        dispatch({ type: SET_LOGIN });
        onSuccess('Logged in successfully!');
        setTokens({
          access_token: res.data.accessToken,
        });
      }
    } catch (error) {
      const err = error as ApiErrorResponse;
      loginError({ errorMessage: err.data.message });
      onError(err.data.message);
      setLoginLoading(false);
    }
    setLoginLoading(false);
  };

  const signup = async ({
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
  }) => {
    try {
      handleSignupLoading(true);
      const res = await guestClient.post<ApiMessageResponse>(
        `${API_URL}/auth/register`,
        values
      );

      if (res && res.status === 201) {
        onSuccess(res.data.message);
      }
    } catch (error) {
      const err = error as ApiErrorResponse;
      loginError({ errorMessage: err.data.message });
      onError(err.data.message);
      handleSignupLoading(false);
    }
    handleSignupLoading(false);
  };

  const logout = async () => {
    try {
      const res = await authClient.post(`${API_URL}/auth/logout`);
      if (res.status === 200) {
        clearTokens();
        dispatch({ type: SET_LOGOUT });
        handleSetIsAuthenticated({ isAuthenticated: false });
        handleSetUser(null);
      }
    } catch (error) {
      const err = error as ApiErrorResponse;
      loginError({ errorMessage: err.data.message });
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        signup,
        login,
        logout,
        getUser,
        handleSetIsAuthenticated,
        updateUserRole,
      }}
    >
      {children}
    </Context.Provider>
  );
};
