import axios from 'axios';

let httpClient = axios.create({
  baseURL: '/api/v1'
});

let httpClientConfig = {
  headers: {
    'x-access-token': (localStorage.getItem('token')) ? localStorage.getItem('token') : undefined
  }
};

export const ALERT_MESSAGE_INFO          = 'ALERT_MESSAGE_INFO';
export const ALERT_MESSAGE_ERROR         = 'ALERT_MESSAGE_ERROR';
export const ALERT_MESSAGE_CLEAR         = 'ALERT_MESSAGE_CLEAR';

export const AUTHENTICATED               = 'AUTHENTICATED';
export const NOT_AUTHENTICATED           = 'NOT_AUTHENTICATED';

export const SIGN_IN_SUCCESS             = 'SIGN_IN_SUCCESS';
export const SIGN_OUT_SUCCESS            = 'SIGN_OUT_SUCCESS';

export const GET_USER_SUCCESS            = 'GET_USER_SUCCESS';
export const UPDATE_USER_SUCCESS         = 'UPDATE_USER_SUCCESS';

export const ADD_OUTLET_SUCCESS          = 'ADD_OUTLET_SUCCESS';
export const CHANGE_STATE_OUTLET_SUCCESS = 'CHANGE_STATE_OUTLET_SUCCESS';
export const DELETE_OUTLET_SUCCESS       = 'DELETE_OUTLET_SUCCESS';
export const UPDATE_OUTLET_SUCCESS       = 'UPDATE_OUTLET_SUCCESS';
export const GET_DATA_OUTLET_SUCCESS     = 'GET_DATA_OUTLET_SUCCESS';
export const GET_OUTLETS_SUCCESS         = 'GET_OUTLETS_SUCCESS';

/*
 * Alert actions
 */

export const alertMessageInfo = message => ({
  type: ALERT_MESSAGE_INFO,
  payload: message
});

export const alertMessageError = message => ({
  type: ALERT_MESSAGE_ERROR,
  payload: message
});

export const alertMessageClear = () => ({
  type: ALERT_MESSAGE_CLEAR
});

/*
 * Auth actions
 */

// The user has a token in his localStorage, so set to true authenticated value of redux
export const authenticated = () => ({
  type: AUTHENTICATED
});

// The user hasn't a token in his localStorage, so set to false authenticated value of redux
export const notAuthenticated = () => ({
  type: NOT_AUTHENTICATED
});

// SignIn
export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS
});

export const signIn = (user, history) => {
  return dispatch => {
    httpClient.post('/authenticate', user)
      .then(response => {
        // Save the token
        localStorage.setItem('token', response.data.token);
        httpClientConfig.headers['x-access-token'] = response.data.token;

        // Get user account informations
        dispatch(getUser()).then(() => {
          dispatch(signInSuccess());
          dispatch(alertMessageInfo(`Bonjour, ${user.email} :)`));
          history.push('/dashboard');
        });
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de la connexion !'));
      });
  };
};

// SignOut
export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOut = history => {
  return dispatch => {
    // Clear the token
    localStorage.removeItem('token');
    httpClientConfig.headers['x-access-token'] = undefined;

    dispatch(signOutSuccess());
    dispatch(alertMessageInfo('Vous avez bien été déconnecté'));
    history.push('/');

    /* TODO: use jwt-blacklist in server api
      httpClient.post('/unauthenticate')
        .then(() => {
          // Clear the token
          localStorage.removeItem('token');
          httpClientConfig['x-access-token'] = undefined;

          dispatch(signOutSuccess());
          dispatch(alertMessageInfo('Vous avez bien été déconnecté'));
          history.push('/');
        })
        .catch(error => {
          console.log(error);
          if(error.response.data.message)
            dispatch(alertMessageError(error.response.data.message));
          else
            dispatch(alertMessageError('Une erreur est survenue lors de la déconnexion !'));
        });
     */
  };
};

// SignUp
export const signUp = (data, history) => {
  return dispatch => {
    httpClient.post('/users', data)
      .then(() => {
        // Redirect to Sign In Page
        dispatch(alertMessageInfo('Votre compte a bien été créé'));
        history.push('/signin');
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de la création de l\'utilisateur !'));
      });
  };
};

/**
 * User action
 */

// Get user informations
export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: user
});

export const getUser = () => {
  return dispatch => {
    return httpClient.get('/users', httpClientConfig)
      .then(response => {
        dispatch(getUserSuccess({
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname
        }));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de la récupération de l\'utilisateur !'));
      });
  };
};

// Update user informations
export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
});

export const updateUser = user => {
  return dispatch => {
    return httpClient.put('/users', user ,httpClientConfig)
      .then(response => {
        dispatch(updateUserSuccess(user));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de la mise à jour de l\'utilisateur !'));
      });
  };
};

/*
 * Outlet actions
 */

// Get outlets of the user
export const getOutletsSuccess = outlets => ({
  type: GET_OUTLETS_SUCCESS,
  payload: outlets
});

export const getOutlets = () => {
  return dispatch => {
    return httpClient.get('/users/outlets', httpClientConfig)
      .then(response => {
        dispatch(getOutletsSuccess(response.data));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de la récupération des prises !'));
      });
  };
};

// Get data of an outlet
export const getDataOutletSuccess = data => ({
  type: GET_DATA_OUTLET_SUCCESS,
  payload: data
});

export const getDataOutlet = request => {
  return dispatch => {
    return httpClient.get(`/outlets/${request.id}/data/${request.date}`, httpClientConfig)
      .then(response => {
        //console.log(response.data);
        dispatch(getDataOutletSuccess(response.data));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError(`Une erreur est survenue lors de la récupération des données de la prise ${request.id} !`));
      });
  };
};

// Add outlet
export const addOutletSuccess = id => ({
  type: ADD_OUTLET_SUCCESS,
  payload: id
});

export const addOutlet = outlet => {
  return dispatch => {
    return httpClient.post('/users/outlets', outlet, httpClientConfig)
      .then(response => {
        dispatch(addOutletSuccess(outlet.outlet_id));
        dispatch(alertMessageInfo('La prise a bien été ajoutée.'));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de l\'ajout de la prise !'));
      });
  };
};

// Update alias outlet
export const updateOutletSuccess = outlet => ({
  type: UPDATE_OUTLET_SUCCESS,
  payload: outlet
});

export const updateOutlet = outlet => {
  return dispatch => {
    return httpClient.put(`/users/outlets/${outlet.id}`, {alias : outlet.alias}, httpClientConfig)
      .then(response => {
        dispatch(updateOutletSuccess(outlet));
        dispatch(alertMessageInfo('La prise a bien été mise à jour.'));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de la mise à jour de la prise !'));
      });
  };
};

// Delete outlet
export const deleteOutletSuccess = id => ({
  type: DELETE_OUTLET_SUCCESS,
  payload: id
});

export const deleteOutlet = id => {
  return dispatch => {
    return httpClient.delete(`/users/outlets/${id}`, httpClientConfig)
      .then(response => {
        dispatch(deleteOutletSuccess(id));
        dispatch(alertMessageInfo('La prise a bien été supprimée.'));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors de la suppresion de la prise !'));
      });
  };
};

// Delete outlet
export const changeStateOutletSuccess = id => ({
  type: CHANGE_STATE_OUTLET_SUCCESS,
  payload: id
});

export const changeStateOutlet = outlet => {
  return dispatch => {
    return httpClient.post(`/users/outlets/${outlet.id}`, {power: outlet.state}, httpClientConfig)
      .then(response => {
        dispatch(changeStateOutletSuccess(outlet.id));
        dispatch(alertMessageInfo('La prise a bien changé d\'état.'));
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(alertMessageError(error.response.data.message));
        else
          dispatch(alertMessageError('Une erreur est survenue lors du changement d\'état de la prise !'));
      });
  };
};
