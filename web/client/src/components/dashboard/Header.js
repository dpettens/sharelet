import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  header: {
    color: '#fff'
  },
  title: {
    '@media (max-width: 350px)': {
      fontSize: '1.1rem'
    }
  },
  expand: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
    color: '#fff'
  },
  avatar: {
    backgroundColor: theme.palette.secondary[500]
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isMenuOpen: false
    };
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      isMenuOpen: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  render() {
    const { classes, initial } = this.props;

    return (
      <AppBar className={classes.header} position="fixed">
        <Toolbar>
          <Typography className={classes.title} color="inherit" component="h1" type="title">
            Dashboard
          </Typography>
          <div className={classes.expand} />

          <Link to="/">
            <IconButton className={classes.button}>
              <HomeIcon />
            </IconButton>
          </Link>

          <IconButton
            aria-owns={this.state.isMenuOpen ? 'user-menu' : null}
            aria-haspopup="true"
            className={classes.button}
            onClick={this.handleClick}
          >
            <Avatar className={classes.avatar}>{initial}</Avatar>
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.isMenuOpen}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem onClick={this.handleRequestClose}>Mon profile</MenuItem>
            <Link to="/signout">
              <MenuItem onClick={this.handleRequestClose}>
                  Se déconnecter
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  initial: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);
