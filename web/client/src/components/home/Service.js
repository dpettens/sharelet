import React from 'react';
import { Section } from 'react-fullpage';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import deepPurple from 'material-ui/colors/deepPurple';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    background: deepPurple[500],
    color: '#fff'
  },
  grid: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  width75: {
    flex: 0.75
  }
});

const Service = ({ center, classes }) => (
  <Section className={classes.root}>
    <div className={center}>
      <div className={classes.width75}>
        <Typography align="center" color="inherit" component="h2" type="display3">
          Notre service
        </Typography>
        <div className={classes.grid}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography align="center" color="inherit" component="h4" gutterBottom type="headline">
                  Premier contact
                </Typography>
                <Typography align="justify">
                  Lors d'un premier contact, nous définirons avec vous les différents appareils à analyser ainsi que la durée de la surveillance.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography align="center" color="inherit" component="h4" gutterBottom type="headline">
                  Génération de rapports
                </Typography>
                <Typography align="justify">
                  A intervalle régulier, nous générerons un rapport afin de vous faire une idée de la consommation de vos appareils.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography align="center" color="inherit" component="h4" gutterBottom type="headline">
                  Remplacement de vos appareils
                </Typography>
                <Typography align="justify">
                  A la fin de la période de surveillance, nous vous proposerons de remplacer vos appareils pour d'autres moins énergivores via notre solution de leasing. 
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  </Section>
);

export default withStyles(styles)(Service);
