import React from 'react';
import { Section } from 'react-fullpage';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import teal from 'material-ui/colors/teal';

const styles = theme => ({
  root: {
    background: teal[500],
    color: '#fff'
  }
});

const About = ({ center, classes }) => (
  <Section className={classes.root}>
    <div className={center}>
      <div>
        <Typography align="center" color="inherit" component="h2" type="display3">
          À propos de nous !
        </Typography>
      </div>
    </div>
  </Section>
);

export default withStyles(styles)(About);
