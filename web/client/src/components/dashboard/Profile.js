import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, destroy } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';
import SendIcon from 'material-ui-icons/Send';

const styles = theme => ({
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

  if (!values.firstname)
    errors.firstname = 'Le prénom est requis.';

  if (!values.lastname)
    errors.lastname = 'Le nom de famille est requis.';

  return errors;
};

const Profile = ({ classes, closeDialog, dispatch, fullScreen, handleSubmit, initialValues, invalid, isDialogOpen, submitting, pristine, reset }) => (
  <Dialog
    fullScreen={fullScreen}
    open={isDialogOpen}
    onRequestClose={closeDialog}
  >
    <DialogTitle>Éditer votre profil</DialogTitle>
    <DialogContent>
      <FormControl fullWidth>
        <Field
          autoFocus
          component={TextField}
          label="Prénom"
          margin="normal"
          name="firstname"
          placeholder="Prénom"
          type="text"
        />
      </FormControl>
      <FormControl fullWidth>
        <Field
          component={TextField}
          label="Nom de famille"
          margin="normal"
          name="lastname"
          placeholder="Nom de famille"
          type="text"
        />
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button
        color="accent"
        onClick={() => {
          reset();
          closeDialog();
        }}
      >
        Annuler
      </Button>
      <div className={classes.button}>
        <Button
          color="accent"
          disabled={pristine || invalid || submitting}
          onClick={() => {
            handleSubmit();
            closeDialog();

            // Fix a bug with DESTROY action's redux-form
            // After submit the form, redux-from doesn't call DESTROY action
            // So we need to send the action manually
            dispatch(destroy('profile'));
          }}
        >
          Envoyer
          <SendIcon className={classes.rightIcon} />
        </Button>
        {submitting && <CircularProgress className={classes.buttonProgress} size={30} />}
      </div>
    </DialogActions>
  </Dialog>
);

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  isDialogOpen: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'profile',
  validate
})(withStyles(styles)(withMobileDialog()(Profile)));
