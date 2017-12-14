import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';

import withRoot from '../withRoot';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.primary[500]
    }
  }
});

const SignOutDialog = ({ handleDisagree, handleSignOut }) => (
  <Dialog open={true}>
    <DialogTitle>{"Voulez-vous vraiment vous déconnecter ?"}</DialogTitle>
    <DialogActions>
      <Button color="accent" onClick={handleDisagree}>
        Non
      </Button>
      <Button autoFocus color="accent" onClick={handleSignOut}>
        Oui
      </Button>
    </DialogActions>
  </Dialog>
);

SignOutDialog.propTypes = {
  handleDisagree: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired
};

export default withRoot(withStyles(styles)(SignOutDialog));
