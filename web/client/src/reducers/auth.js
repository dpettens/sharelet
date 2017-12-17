import {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../actions';

/*
 * Shape of reducer :
 *
 * authenticated: bool
 */

const auth = (state = {}, action) => {
  switch(action.type) {
    case AUTHENTICATED:
    case SIGN_IN_SUCCESS:
      return {
        authenticated: true
    };
    case NOT_AUTHENTICATED:
    case SIGN_OUT_SUCCESS:
      return {
        authenticated: false
      };
    default:
      return state;
  }
};

export default auth;
