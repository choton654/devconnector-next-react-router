import Axios from 'axios';
import router from 'next/router';
import { createContext, useContext, useReducer } from 'react';
import appState from '../../utils/appState';
import profileReducer from '../reducers/profileReducer';
import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER,
} from '../types';
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { profile } = appState();

  const initialState = {
    profile: profile || null,
    profiles: null,
    loading: false,
    errors: {},
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);

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
      dispatch({ type: SET_CURRENT_USER, payload: {} });
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        state,
        getProfile,
        createProfile,
        deleteProfile,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const ProfileState = () => useContext(ProfileContext);
