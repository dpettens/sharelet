import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  '@global': {
    body: {
      margin: 0,
      padding: 0,
      background: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale' // Antialiasing.
    },
    a: {
      textDecoration: 'none'
    }
  }
});

let AppWrapper = props => props.children;
AppWrapper = withStyles(styles)(AppWrapper);

const withRoot = BaseComponent => props => (
  <AppWrapper>
    <BaseComponent {...props} />
  </AppWrapper>
);

export default withRoot;
