import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import router from 'next/router';
import { createContext, useContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from '../types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let token, decode;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    if (token) {
      decode = jwt_decode(token);
      Axios.defaults.headers.common['Authorization'] = token;
      const currentTime = Date.now() / 1000;
      if (decode.exp < currentTime) {
        decode = {};
        token = null;
        window.location.href = '/login';
      }
    }
  }

  const initialState = {
    token: token,
    isAuthenticated: decode ? true : false,
    user: decode ? decode : {},
    errors: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (userData) => {
    try {
      const { data } = await Axios.post('/api/users/register', userData);
      router.push('/login');
      dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const loginUser = async (userData) => {
    try {
      const {
        data: { token },
      } = await Axios.post('/api/users/login', userData);
      const decode = jwt_decode(token);
      localStorage.setItem('token', token);
      setAuthToken(token);
      setUser(decode);
      dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setAuthToken(false);
    setUser({});
  };

  const setAuthToken = (token) => {
    if (token) {
      Axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete Axios.defaults.headers.common['Authorization'];
    }
  };

  const setUser = (decode) => {
    return dispatch({ type: SET_CURRENT_USER, payload: decode });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        registerUser,
        loginUser,
        setUser,
        setAuthToken,
        logoutUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => useContext(AuthContext);
