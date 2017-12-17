import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {
  DialogActions,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';
import DeleteIcon from 'material-ui-icons/Delete';

class Delete extends Component {
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
    const { fullScreen, handleDelete, id } = this.props;

    return (
      <div>
        <Tooltip placement="bottom" title="Supprimer la prise">
          <IconButton aria-label="Supprimer la prise" onClick={this.handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.isDialogOpen}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>Voulez-vous vraiment supprimer la prise <em>{id}</em> ?</DialogTitle>
          <DialogActions>
            <Button
              color="accent"
              onClick={this.handleRequestClose}
            >
              Non
            </Button>
            <Button
              autoFocus
              color="accent"
              onClick={() => {
                handleDelete();
                this.handleRequestClose();
              }}
            >
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Delete.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default withMobileDialog()(Delete);
