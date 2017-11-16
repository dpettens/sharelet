import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';

const styles = theme => ({
  header: {
    boxShadow: "none",
    color: '#fff'
  },
  backButton: {
    marginRight: 20,
    color: '#fff'
  },
  title: {
    '@media (max-width: 350px)': {
      fontSize: '1.1rem'
    }
  }
});

const Header = ({ classes, type }) => {
  const text = (type === 'signin') ? 'Se Connecter' : 'S\'inscrire';

  return(
    <AppBar className={classes.header} position="fixed">
      <Toolbar>
        <Link to="/">
          <IconButton
            aria-label="Back"
            className={classes.backButton}
          >
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography className={classes.title} color="inherit" component="h1" type="title">
          Sharelet - {text}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);
