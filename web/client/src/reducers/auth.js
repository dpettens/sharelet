import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_ERROR_MESSAGE_CLEAR,
  SIGN_INFO_MESSAGE_CLEAR
} from '../actions';

const auth = (state = {}, action) => {
  switch(action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        infoMessage: action.payload
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        infoMessage: action.payload
      };
    case SIGN_OUT_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        infoMessage: action.payload
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SIGN_ERROR_MESSAGE_CLEAR:
      return {
        ...state,
        errorMessage: undefined
      };
    case SIGN_INFO_MESSAGE_CLEAR:
      return {
        ...state,
        infoMessage: undefined
      };
    default:
      return state;
  }
};

export default auth;
