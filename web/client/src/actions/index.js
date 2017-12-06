import axios from 'axios';

let httpClient = axios.create({
  baseURL: '/api/v1'
});

let httpClientConfig = {
  headers: {
    'x-access-token': (localStorage.getItem('token')) ? localStorage.getItem('token') : undefined
  }
};

export const SIGN_IN_SUCCESS            = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR              = 'SIGN_IN_ERROR';
export const SIGN_OUT_SUCCESS           = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR             = 'SIGN_OUT_ERROR';
export const SIGN_UP_SUCCESS            = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR              = 'SIGN_UP_ERROR';
export const SIGN_ERROR_MESSAGE_CLEAR   = 'SIGN_ERROR_MESSAGE_CLEAR';
export const SIGN_INFO_MESSAGE_CLEAR    = 'SIGN_INFO_MESSAGE_CLEAR';

export const ADD_OUTLET_SUCCESS         = 'ADD_OUTLET_SUCCESS';
export const ADD_OUTLET_ERROR           = 'ADD_OUTLET_ERROR';

/*
 * Auth actions
 */

// Clear error message
export const signErrorMessageClear = () => ({
  type: SIGN_ERROR_MESSAGE_CLEAR
});

// Clear info message
export const signInfoMessageClear = () => ({
  type: SIGN_INFO_MESSAGE_CLEAR
});

// SignIn
export const signInSuccess = message => ({
  type: SIGN_IN_SUCCESS,
  payload: message
});

export const signInError = error => ({
  type: SIGN_IN_ERROR,
  payload: error
});

export const signIn = (user, history) => {
  return dispatch => {
    httpClient.post('/authenticate', user)
      .then(response => {
        // Save the token
        localStorage.setItem('token', response.data.token);
        httpClientConfig.headers['x-access-token'] = response.data.token;

        dispatch(signInSuccess(`Bonjour, ${user.email} :)`));
        history.push('/');
      })
      .catch(error => {
        console.log(error);
        if(error.response.data.message)
          dispatch(signInError(error.response.data.message));
        else
          dispatch(signInError('Une erreur est survenue lors de la connexion !'));
      });
  };
};

// SignOut
export const signOutSuccess = message => ({
  type: SIGN_OUT_SUCCESS,
  payload: message
});

export const signOutError = error => ({
  type: SIGN_OUT_ERROR,
  payload: error
});

export const signOut = history => {
  return dispatch => {
    // Clear the token
    localStorage.removeItem('token');
    httpClientConfig.headers['x-access-token'] = undefined;

    dispatch(signOutSuccess('Vous avez bien été déconnecté'));
    history.push('/dashboard');

    /* TODO: use jwt-blacklist in server api
      httpClient.post('/unauthenticate')
        .then(() => {
          // Clear the token
          localStorage.removeItem('token');
          httpClientConfig['x-access-token'] = undefined;

          dispatch(signOutSuccess('Vous avez bien été déconnecté'));
          history.push('/');
        })
        .catch(error => {
          console.log(error);
          if(error.response.data.message)
            dispatch(signOutError(error.response.data.message));
          else
            dispatch(signOutError('Une erreur est survenue lors de la déconnexion !'));
        });
     */
  };
};

// SignUp
export const signUpSuccess = message => ({
  type: SIGN_UP_SUCCESS,
  payload: message
});

export const signUpError = error => ({
  type: SIGN_UP_ERROR,
  payload: error
});

export const signUp = (data, history) => {
  return dispatch => {
    httpClient.post('/users', data)
      .then(() => {
        // Redirect to Sign In Page
        dispatch(signUpSuccess('Votre compte a bien été créé'));
        history.push('/signin');
      })
      .catch(error => {
        if(error.response.data.message)
          dispatch(signUpError(error.response.data.message));
        else
          dispatch(signUpError('Une erreur est survenue lors de la création de l\'utilisateur !'));
      });
  };
};

/**
 * Outlet actions
 */

// Add outlet
export const addOutletSuccess = message => ({
  type: ADD_OUTLET_SUCCESS,
  payload: message
});

export const addOutletError = error => ({
  type: ADD_OUTLET_ERROR,
  payload: error
});

export const addOutlet = (outlet) => {
  return dispatch => {
    console.log(httpClientConfig.headers['x-access-token']);
    httpClient.get('/users', httpClientConfig)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    /*
    httpClient.post('/users/outlets', outlet, httpClientConfig)
      .then(response => {
        dispatch(addOutletSuccess(`La prise a bien été ajoutée.`));
      })
      .catch(error => {
        console.log(error);
        if(error.response.data.message)
          dispatch(addOutletError(error.response.data.message));
        else
          dispatch(addOutletError('Une erreur est survenue lors de la connexion !'));
      });
      */
  };
};