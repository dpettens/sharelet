import React from 'react';
import { Section } from 'react-fullpage';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    background: theme.palette.primary[500],
    color: '#fff'
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '5rem'
    }
  }
});

const Home = ({ center, classes }) => (
  <Section className={classes.root}>
    <div className={center}>
      <div>
        <Typography align="center" className={classes.title} color="inherit" component="h1" type="display4">
          Sharelet
        </Typography>
        <Typography align="center" color="inherit" component="h2" type="display1">
          A Smart Plug for Business
        </Typography>
      </div>
    </div>
  </Section>
);

export default withStyles(styles)(Home);
