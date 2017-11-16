import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import InfoIcon from 'material-ui-icons/Info';
import WarningIcon from 'material-ui-icons/Warning';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  contentIcon: {
    marginRight: '12px'
  },
  infoIcon: {
    color: theme.palette.secondary[500]
  },
  warningIcon: {
    color: theme.palette.error[500]
  }
});

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  };

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway')
      return;

    this.setState({
      isOpen: false
    });
  };

  render() {
    const { classes, text, type } = this.props;

    let icon;
    switch(type) {
      case 'warning':
        icon = <WarningIcon className={classNames(classes.contentIcon, classes.warningIcon)} />;
        break;
      case 'info':
        icon = <InfoIcon className={classNames(classes.contentIcon, classes.infoIcon)} />;
        break;
      default:
        icon = undefined;
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onRequestClose={this.handleRequestClose}
        open={this.state.isOpen}
        message={
          <div className={classes.content}>
            {icon}
            <span>{text}</span>
          </div>
        }
        action={
          <IconButton
            aria-label="Fermer"
            className={classes.close}
            color="inherit"
            key="close"
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  };
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Alert);
