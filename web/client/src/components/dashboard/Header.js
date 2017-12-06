import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  header: {
    color: '#fff'
  },
  title: {
    '@media (max-width: 350px)': {
      fontSize: '1.1rem'
    }
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

const Header = ({ classes }) => (
  <AppBar className={classes.header} position="fixed">
    <Toolbar>
      <Typography className={classes.title} color="inherit" component="h1" type="title">
        Dashboard
      </Typography>
      <div className={classes.authButtons}>
        <Link key="1" to="/">
          <Button className={classes.authButton} color="accent" raised>
            Accueil
          </Button>
        </Link>
        <Link key="2" to="/signout">
          <Button className={classes.authButton} color="accent" raised>
            Déconnexion
          </Button>
        </Link>
      </div>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
