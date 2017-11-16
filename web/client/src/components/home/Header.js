import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import MenuDrawer from './MenuDrawer';

const styles = theme => ({
  header: {
    boxShadow: "none"
  },
  menuButton: {
    color: '#fff',
  },
  authButtons: {
    marginLeft: 'auto'
  },
  authButton: {
    margin: theme.spacing.unit,
    '@media (max-width: 350px)': {
      fontSize: '0.670rem'
    }
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    };
  };

  toggleDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  };

  authLinks = () => {
    const { authenticated, classes } = this.props;

    if (authenticated)
      return [
        <Link key="1" to="/dashboard">
          <Button className={classes.authButton} color="accent" raised>
            Dashboard
          </Button>
        </Link>,
        <Link key="2" to="/signout">
          <Button className={classes.authButton} color="accent" raised>
            Déconnection
          </Button>
        </Link>
      ];
    else
      return [
        <Link key="1" to="/signin">
          <Button className={classes.authButton} color="accent" raised>
            Connexion
          </Button>
        </Link>,
        <Link key="2" to="/signup">
          <Button className={classes.authButton} color="accent" raised>
            Inscription
          </Button>
        </Link>
      ];
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar className={classes.header} position="fixed">
          <Toolbar>
            <IconButton aria-label="Menu" className={classes.menuButton} onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <div className={classes.authButtons}>
              {this.authLinks()}
            </div>
          </Toolbar>
        </AppBar>
        <MenuDrawer isOpen={this.state.isDrawerOpen} toggleDrawer={this.toggleDrawer} />
      </div>
    );
  };
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
