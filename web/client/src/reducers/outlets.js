import {
  SIGN_OUT_SUCCESS,
  ADD_OUTLET_SUCCESS,
  UPDATE_OUTLET_SUCCESS,
  GET_OUTLETS_SUCCESS,
  DELETE_OUTLET_SUCCESS,
  CHANGE_STATE_OUTLET_SUCCESS
} from '../actions';

const toAssociative = outlets => {
  let associative = {};

  outlets.forEach(outlet => {
    associative[outlet.id] = {
      id: outlet.id,
      alias: outlet.alias,
      state: outlet.state
    };
  });

  return associative;
};

/*
 * Shape of reducer :
 *
 * Associative array (object) of outlets
 *
 * Shape of outlet :
 *
 * id: string
 * alias: string
 * state: bool
 */

const outlets = (state = [], action) => {
  switch (action.type) {
    case ADD_OUTLET_SUCCESS:
      return {
        ...state,
        [action.payload]: {
          id: action.payload,
          alias: undefined,
          state: false
        }
      };
    case CHANGE_STATE_OUTLET_SUCCESS: {
      const clone = {...state};
      clone[action.payload].state = !clone[action.payload].state;
      return clone;
    }
    case DELETE_OUTLET_SUCCESS: {
      const clone = {...state};
      delete clone[action.payload];
      return clone;
    }
    case UPDATE_OUTLET_SUCCESS: {
      const clone = {...state};
      clone[action.payload.id].alias = action.payload.alias;
      return clone;
    }
    case GET_OUTLETS_SUCCESS:
      return toAssociative(action.payload);
    case SIGN_OUT_SUCCESS:
      return [];
    default:
      return state;
  }
};

export default outlets;
