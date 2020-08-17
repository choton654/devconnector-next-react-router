import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { createContext, useContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from '../types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: {},
    errors: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (userData, history) => {
    try {
      const { data } = await Axios.post('/api/users/register', userData);
      history.push('/login');
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
      setAuthToken(token);
      const decode = jwt_decode(token);
      dispatch({ type: SET_CURRENT_USER, payload: decode });
      dispatch({ type: CLEAR_ERRORS });
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => useContext(AuthContext);
