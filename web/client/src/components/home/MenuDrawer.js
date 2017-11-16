import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  drawer: {
    width: 250,
  },
  drawerHeader: {
    display: 'flex',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    alignItems: 'center',
    color: theme.palette.common.lightBlack,
    ...theme.mixins.toolbar
  },
  link: {
    textDecoration: 'none'
  }
});

// TODO: Fix hash and Link component from react-router-dom
const MenuDrawer = ({ classes, isOpen, toggleDrawer }) => (
  <Drawer onRequestClose={toggleDrawer} open={isOpen}>
    <div
      className={classes.drawer}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      role="button"
      tabIndex={0}
    >
      <div className={classes.drawerHeader}>
        <Typography color="inherit" type="title">
          Sharelet
        </Typography>
      </div>
      <Divider />
      <List>
        <a className={classes.link} href="#home">
          <ListItem button>
            <ListItemText primary="Accueil" />
          </ListItem>
        </a>
        <a className={classes.link} href="#about">
          <ListItem button>
            <ListItemText primary="À propos" />
          </ListItem>
        </a>
        <a className={classes.link} href="#contact">
          <ListItem button>
            <ListItemText primary="Nous contacter" />
          </ListItem>
        </a>
      </List>
    </div>
  </Drawer>
);

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(MenuDrawer);
