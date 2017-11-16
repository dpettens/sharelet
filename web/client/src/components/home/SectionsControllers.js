import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import ArrowDownward from 'material-ui-icons/ArrowDownward';

const styles = theme => ({
  root: {
    position: 'fixed',
    display : 'flex',
    top: '50%',
    right: '10px',
    flexDirection: 'column',
    transform: 'translate3d(0, -50%, 0)'
  },
  button: {
    margin: theme.spacing.unit,
  }
});

const SectionsControllers = ({ classes, current, onNext, onPrev, sectionsCount }) => (
  <Hidden smDown>
    <div className={classes.root}>
      <Button
        aria-label="Up"
        className={classes.button}
        color="accent"
        disabled={current === 0}
        fab
        onClick={onPrev}
      >
        <ArrowUpward />
      </Button>
      <Button
        aria-label="Down"
        className={classes.button}
        color="accent"
        disabled={current === sectionsCount - 1}
        fab
        onClick={onNext}
      >
        <ArrowDownward />
      </Button>
    </div>
  </Hidden>
);

SectionsControllers.propTypes = {
  classes: PropTypes.object.isRequired,
  current: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  sectionsCount: PropTypes.number.isRequired
};

export default withStyles(styles)(SectionsControllers);
