import React from 'react';
import { Section } from 'react-fullpage';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    background: blue[500],
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

const Outlet = ({ center, classes }) => (
  <Section className={classes.root}>
    <div className={center}>
      <div className={classes.width75}>
        <Typography align="center" color="inherit" component="h2" type="display3">
          La prise
        </Typography>
        <div className={classes.grid}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography align="center" color="inherit" component="h4" gutterBottom type="headline">
                  Surveillance de consommation
                </Typography>
                <Typography align="justify">
                  Notre prise vous permet de surveiller votre consommation en définissant des seuils de sécurité. Ces seuils vous permettront d'être averti en temps réel en cas de surconsommation ou dysfonctionnement de votre appareil.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography align="center" color="inherit" component="h4" gutterBottom type="headline">
                  Contrôle à distance
                </Typography>
                <Typography align="justify">
                  Ne vous est-il jamais arrivé d'oublier d'éteindre un appareil en partant de chez vous ou de votre bureau et devoir faire demi-tour? Avec Sharelet, cela est terminé. Un simple clic dans l'application vous permet d'éteindre votre appareil, où que vous soyez.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  </Section>
);

export default withStyles(styles)(Outlet);
