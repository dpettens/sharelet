import {
  ADD_OUTLET_ERROR,
  ADD_OUTLET_SUCCESS
} from '../actions';

const outlets = (state = {}, action) => {
  switch (action.type) {
      case ADD_OUTLET_SUCCESS:
        return {
          ...state,
          infoMessage: action.payload
        };
      case ADD_OUTLET_ERROR:
        return {
          ...state,
          errorMessage: action.payload
        };
      default:
          return state;
  }
};

export default outlets;
