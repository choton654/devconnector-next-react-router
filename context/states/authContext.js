import Axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import router from 'next/router';
import { createContext, useContext, useReducer } from 'react';
import appState from '../../utils/appState';
import authReducer from '../reducers/authReducer';
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER,
} from '../types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { profile, token, decode } = appState();

  const initialState = {
    token: token,
    isAuthenticated: decode ? true : false,
    user: decode || {},
    profile: profile || {},
    profiles: [],
    loading: false,
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
      Cookies.set('token', token);
      setAuthToken(token);
      setUser(decode);
      dispatch({ type: CLEAR_ERRORS });
      router.push('/users');
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const logoutUser = () => {
    Cookies.remove('token');
    setAuthToken(false);
    setUser({});
    window.location.href = '/login';
  };

  const getProfile = async () => {
    try {
      dispatch({ type: PROFILE_LOADING });
      const { data } = await Axios.get('/api/profile');
      dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {
      console.error(error.response);
      dispatch({ type: GET_PROFILE, payload: {} });
    }
  };

  const createProfile = async (profileData) => {
    try {
      const { data } = await Axios.post('/api/profile', profileData);
      console.log(data);
      router.push('/users');
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const deleteProfile = async () => {
    try {
      await Axios.delete('/api/profile');
      Cookies.remove('token');
      setUser({});
      dispatch({ type: GET_PROFILE, payload: {} });
      router.push('/register');
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const setUser = (decode) => {
    return dispatch({ type: SET_CURRENT_USER, payload: decode });
  };

  const setAuthToken = (token) => {
    if (token) {
      Axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete Axios.defaults.headers.common['Authorization'];
    }
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
        getProfile,
        createProfile,
        deleteProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => useContext(AuthContext);
