import { isEmpty } from '../../utils/validators';
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_CURRENT_USER,
  SET_TOKEN,
} from '../types';

export default function authReducer(state, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
