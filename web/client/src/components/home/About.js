import React from 'react';
import { Section } from 'react-fullpage';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import teal from 'material-ui/colors/teal';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    background: teal[500],
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

const owners = [
  {
    name: "Nicolas Surleraux",
    description: "Nicolas est passionné par l'informatique et le développement durable. Il a participé au développement de l'application en prenant en compte tous les critères afin de rendre l'utilisation de cette dernière fluide et agréable."
  },
  {
    name: "Denis Pettens",
    description: "Denis est passionné par l'informatique et le développement durable..."
  },
  {
    name: "Amélie Courtin",
    description: "Amélie est passionnée par l'informatique et le développement durable..."
  },
  {
    name: "Danielle Delfosse",
    description: "Danielle est passionnée par l'informatique et le développement durable..."
  },
  {
    name: "Nadia Mbarushimana",
    description: "Nadia est passionnée par l'informatique et le développement durable..."
  },
  {
    name: "Clément Brancart",
    description: "Clément est passionné par l'informatique et le développement durable..."
  },
];


const About = ({ center, classes }) => (
  <Section className={classes.root}>
    <div className={center}>
      <div className={classes.width75}>
        <Typography align="center" color="inherit" component="h2" type="display3">
          À propos de nous !
        </Typography>
        <div className={classes.grid}>
          <Grid container spacing={24}>
            {owners.map((owner) => {
              return (
                <Grid item xs={4} key={owner.name}>
                  <Paper className={classes.paper}>
                    <Typography align="center" component="h4" type="headline">
                      {owner.name}
                    </Typography>
                    <Typography align="center">
                      {owner.description}
                    </Typography>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    </div>
  </Section>
);

export default withStyles(styles)(About);
