import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  header: {
    color: '#fff'
  },
  title: {
    '@media (max-width: 350px)': {
      fontSize: '1.1rem'
    }
  }
});

const Header = ({ classes }) => (
  <AppBar className={classes.header} position="fixed">
    <Toolbar>
      <Typography className={classes.title} color="inherit" component="h1" type="title">
        Sharelet - Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
