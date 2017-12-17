import {
  GET_USER_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../actions';

/*
 * Shape of reducer :
 *
 * email: string
 * firstname: string
 * lastname: string
 */

const user = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname
      };
    case SIGN_OUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default user;
