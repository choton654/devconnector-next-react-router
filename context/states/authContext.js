import Axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Router from 'next/router';
import { createContext, useContext, useReducer } from 'react';
import appState from '../../utils/appState';
import authReducer from '../reducers/authReducer';
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_CURRENT_USER,
  SET_TOKEN,
} from '../types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token, decode } = appState();

  const initialState = {
    token: token || null,
    isAuthenticated: decode ? true : false,
    user: decode || {},
    profile: {},
    profiles: [],
    loading: false,
    errors: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // auth actions

  const setUser = (decode) => {
    return dispatch({ type: SET_CURRENT_USER, payload: decode });
  };

  const setAuthToken = (token) => {
    if (token) {
      dispatch({ type: SET_TOKEN, payload: token });
      Axios.defaults.headers.common['Authorization'] = token;
    } else {
      dispatch({ type: SET_TOKEN, payload: null });
      delete Axios.defaults.headers.common['Authorization'];
    }
  };

  const registerUser = async (userData) => {
    try {
      const { data } = await Axios.post('/api/users/register', userData);
      Router.push('/login');
      dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
      console.error(error);
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
      Router.push('/users');
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const logoutUser = () => {
    Cookies.remove('token');
    setAuthToken(false);
    setUser({});
    window.location.href = '/login';
  };

  // profile actions

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
      Router.push('/users');
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const deleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete')) {
      try {
        await Axios.delete('/api/profile');
        logoutUser();
      } catch (error) {
        console.error(error);
        dispatch({ type: GET_ERRORS, payload: error.response.data });
      }
    }
  };

  const addExperience = async (expData) => {
    try {
      const { data } = await Axios.post('/api/profile/experience', expData);
      Router.push('/users');
      console.log(data);
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };
  const addEducation = async (eduData) => {
    try {
      const { data } = await Axios.post('/api/profile/education', eduData);
      Router.push('/users');
      console.log(data);
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  const deleteExperience = async (expId) => {
    try {
      const { data } = await Axios.delete(`/api/profile/experience/${expId}`);
      dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEducation = async (eduId) => {
    try {
      const { data } = await Axios.delete(`/api/profile/education/${eduId}`);
      dispatch({ type: GET_PROFILE, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getProfiles = async () => {
    try {
      dispatch({ type: PROFILE_LOADING });
      const { data } = await Axios.get('/api/profile/all');
      dispatch({ type: GET_PROFILES, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        registerUser,
        loginUser,
        logoutUser,
        getProfile,
        createProfile,
        deleteProfile,
        addExperience,
        addEducation,
        deleteExperience,
        deleteEducation,
        getProfiles,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => useContext(AuthContext);
