import {
  ALERT_MESSAGE_CLEAR,
  ALERT_MESSAGE_ERROR,
  ALERT_MESSAGE_INFO
} from '../actions';

const type = {
  ERROR: 'error',
  INFO: 'info'
};

/*
 * Shape of reducer :
 *
 * type: type
 * message: string
 */

const alert = (state = {}, action) => {
  switch (action.type) {
    case ALERT_MESSAGE_CLEAR:
      return {};
    case ALERT_MESSAGE_ERROR:
      return {
        type: type.ERROR,
        message: action.payload
      };
    case ALERT_MESSAGE_INFO:
      return {
        type: type.INFO,
        message: action.payload
      };
    default:
      return state;
  }
};

export default alert;
