import { isEmpty } from '../../utils/validators';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from '../types';

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
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
