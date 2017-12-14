import React from 'react';
import { Section } from 'react-fullpage';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import amber from 'material-ui/colors/amber';

const styles = theme => ({
  root: {
    background: amber[300],
    color: '#fff'
  }
});

const Contact = ({ center, classes }) => (
  <Section className={classes.root}>
    <div className={center}>
      <div>
        <Typography align="center" color="inherit" component="h2" type="display3">
          Contactez-nous !
        </Typography>
      </div>
    </div>
  </Section>
);

export default withStyles(styles)(Contact);
