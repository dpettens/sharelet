import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, change } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';
import SendIcon from 'material-ui-icons/Send';
import EditIcon from 'material-ui-icons/Edit';

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

  if (!values.alias)
    errors.alias = 'Le nom de la prise est requis.';

  return errors;
};

class Update extends Component {
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

    // Fix a bug with initialValues and INITIALIZE and DESTROY actions's redux-form
    // After submit the form, redux-from call DESTROY action
    // But when we open again the dialog redux-form doesn't recall INITIALIZE
    // So the fields doesn't have the new values from initialValues
    this.props.dispatch(change('updateOutlet', 'alias', this.props.initialValues.alias));
  };

  handleRequestClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  render() {
    const { classes, fullScreen, handleSubmit, id, invalid, initialValues, submitting, pristine, reset } = this.props;
    const isAlias = initialValues.alias !== undefined;
    return (
      <div>
        <Tooltip placement="bottom" title="Éditer le nom de la prise">
          <IconButton aria-label="Éditer le nom de la prise" onClick={this.handleClickOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.isDialogOpen}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>{(!isAlias) ? "Ajouter un nom à la prise" : "Éditer le nom de la prise"} <em>{id}</em></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ajouter un nom à la prise vous permet de plus facilement la reconnaître.
            </DialogContentText>
            <FormControl fullWidth>
              <Field
                autoFocus
                component={TextField}
                label="Nom de la prise"
                margin="normal"
                name="alias"
                placeholder="Nom de la prise"
                type="text"
                value=""
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
Update.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'updateOutlet',
  validate
})(withStyles(styles)(withMobileDialog()(Update)));
