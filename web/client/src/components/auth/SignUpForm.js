import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';

const styles = theme => ({
  buttons : {
    display: 'flex',
    marginTop: theme.spacing.unit * 3
  },
  button: {
    position: 'relative',
    marginLeft: 'auto'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: theme.palette.secondary[500],
    transform: 'translate3d(-50%, -50%, 0)'
  }
});

const validate = values => {
  let errors = {};

  if(!values.firstname)
    errors.firstname = 'Le prénom est requis.';

  if(!values.lastname)
    errors.lastname = 'Le nom de famille est requis.';

  if (!values.email)
    errors.email = 'L\'adresse mail est requis.';
  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email))
    errors.email = 'L\'adresse mail est invalide.';

  if (!values.password)
    errors.password = 'Le mot de passe est requis.';
  else if (values.password.length < 4)
    errors.password = 'Le mot de passe doit avoir au moins 4 caractères.';

  return errors;
};

const SignUpForm = ({ classes, handleSubmit, invalid, submitting }) => (
  <div>
    <Typography component="h2" gutterBottom type="title">
      S'inscrire
    </Typography>

    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Field
          component={TextField}
          label="Prénom"
          margin="normal"
          name="firstname"
          placeholder="Prénom"
        />
      </FormControl>
      <FormControl fullWidth>
        <Field
          component={TextField}
          label="Nom de famille"
          margin="normal"
          name="lastname"
          placeholder="Nom de famille"
        />
      </FormControl>
      <FormControl fullWidth>
        <Field
          component={TextField}
          label="Email"
          margin="normal"
          name="email"
          placeholder="Email"
          type="email"
        />
      </FormControl>
      <FormControl fullWidth>
        <Field
          component={TextField}
          label="Mot de passe"
          margin="normal"
          name="password"
          placeholder="Mot de passe"
          type="password"
        />
      </FormControl>
      <div className={classes.buttons}>
        <div className={classes.button}>
          <Button
            color="accent"
            disabled={invalid || submitting}
            raised
            type="submit"
          >
            Envoyer
            <Send className={classes.rightIcon} />
          </Button>
          {submitting && <CircularProgress className={classes.buttonProgress} size={30} />}
        </div>
      </div>
    </form>
  </div>
);

//TODO: PropTypes redux-form
SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'signup',
  validate
})(withStyles(styles)(SignUpForm));
