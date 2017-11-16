import axios from 'axios';

export const SIGN_IN_SUCCESS            = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR              = 'SIGN_IN_ERROR';
export const SIGN_OUT_SUCCESS           = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR             = 'SIGN_OUT_ERROR';
export const SIGN_UP_SUCCESS            = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR              = 'SIGN_UP_ERROR';
export const SIGN_ERROR_MESSAGE_CLEAR   = 'SIGN_ERROR_MESSAGE_CLEAR';
export const SIGN_INFO_MESSAGE_CLEAR    = 'SIGN_INFO_MESSAGE_CLEAR';

const API_URI = '/api/v1';

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
    axios.post(`${API_URI}/authenticate`, user)
      .then(response => {
        // Save the token
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        console.log(axios.defaults.headers.common['Authorization']);

        dispatch(signInSuccess(`Bonjour, ${user.email} :)`));
        history.push('/');
      })
      .catch(error => {
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
    axios.defaults.headers.common['Authorization'] = undefined;

    dispatch(signOutSuccess('Vous avez bien été déconnecté'));
    history.push('/dashboard');

    /* TODO: use jwt-blacklist in server api
      axios.post(`${API_URI}/unauthenticate`)
        .then(() => {
          // Clear the token
          localStorage.removeItem('token');
          axios.defaults.headers.common['Authorization'] = undefined;

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
    axios.post(`${API_URI}/users`, data)
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
