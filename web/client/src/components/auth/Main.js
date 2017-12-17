import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import withRoot from '../withRoot';
import Header from './Header';
import Footer from './Footer';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.primary[500]
    }
  },
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    '&::before, &::after': {
      display: 'block',
      flex: '0 0 auto',
      content: '\'\'',
      ...theme.mixins.toolbar
    }
  },
  center: {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    position: 'relative',
    width: 500,
    margin: theme.spacing.unit * 3,
    boxSizing: 'border-box'
  },
  form: {
    padding: theme.spacing.unit * 3
  },
  footer: {
    position: 'absolute'
  }
});

const Main = ({ children, classes, type }) => (
  <div className={classes.root}>
    <Header type={type} />
    <div className={classes.center}>
      <div className={classes.content}>
        <Paper className={classes.form} elevation={4}>
          {children}
        </Paper>
        <Footer className={classes.footer} type={type} />
      </div>
    </div>
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Main));
