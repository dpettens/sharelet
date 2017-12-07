import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';
import AddIcon from 'material-ui-icons/Add';
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

  if (!values.outlet_id)
    errors.outlet_id = 'L\'ID de la prise est requis.';

  if (!values.pwd)
    errors.pwd = 'Le mot de passe est requis.';

  return errors;
};

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false
    };
  };

  handleClickOpen = () => {
    this.setState({
      isDialogOpen: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  render() {
    const { classes, className, fullScreen, handleSubmit, invalid, submitting, pristine , reset } = this.props;

    return (
      <div>
        <Button
          aria-label="Add"
          className={className}
          color="accent"
          fab
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.isDialogOpen}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>Ajouter une prise</DialogTitle>
          <DialogContent>
            <DialogContentText>
              L'ID et le mot de passe de la prise se trouvent au dos du boitier que vous venez de brancher.
            </DialogContentText>
            <FormControl fullWidth>
              <Field
                autoFocus
                component={TextField}
                label="ID de la prise"
                margin="normal"
                name="outlet_id"
                placeholder="ID de la prise"
                type="text"
              />
            </FormControl>
            <FormControl fullWidth>
              <Field
                component={TextField}
                label="Mot de passe"
                margin="normal"
                name="pwd"
                placeholder="Mot de passe"
                type="text"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              color="accent"
              onClick={() => {
                reset();
                this.handleRequestClose();
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
                  this.handleRequestClose();
                }}
              >
                Envoyer
                <SendIcon className={classes.rightIcon} />
              </Button>
              {submitting && <CircularProgress className={classes.buttonProgress} size={30} />}
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

//TODO: PropTypes redux-form
Add.propTypes = {
  className: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'addOutlet',
  validate
})(withStyles(styles)(withMobileDialog()(Add)));
