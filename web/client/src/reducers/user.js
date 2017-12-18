import {
  GET_USER_SUCCESS,
  SIGN_OUT_SUCCESS,
  UPDATE_USER_SUCCESS
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
        ...action.payload
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case SIGN_OUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default user;
