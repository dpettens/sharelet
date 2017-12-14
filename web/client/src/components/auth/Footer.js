import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    ...theme.mixins.toolbar
  }
});

const Footer = ({ className, classes, type }) => {
  const href = (type === 'signin') ? '/signup' : '/signin';
  const text = (type === 'signin') ? 'Créer un compte ?' : 'Déjà un compte ?';

  return (
    <div className={classNames(className, classes.root)}>
      <Link to={href}>
        <Button>{text}</Button>
      </Link>
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
