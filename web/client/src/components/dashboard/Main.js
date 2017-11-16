import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import withRoot from '../withRoot';
import Header from './Header';
import Alert from '../Alert';

const styles = theme => ({});

const Main = ({ errorMessage, infoMessage }) => (
  <div>
    <Header />
    <div>
      <p>Test</p>
    </div>

    {infoMessage && <Alert text={infoMessage} type="info" />}
  </div>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  infoMessage: PropTypes.string
};

export default withRoot(withStyles(styles)(Main));
