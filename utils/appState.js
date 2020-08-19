import Axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const appState = () => {
  let token, decode, profile;

  if (typeof window !== 'undefined') {
    token = Cookies.get('token');
    if (token) {
      decode = jwt_decode(token);
      Axios.defaults.headers.common['Authorization'] = token;
      const currentTime = Date.now() / 1000;
      if (decode.exp < currentTime) {
        decode = {};
        token = null;
        profile = null;
        // window.location.href = '/Login';
      }
    }
  }

  return {
    token,
    decode,
    profile,
  };
};

export default appState;
