import React from 'react';
import PropTypes from 'prop-types';
import DragSortableList from 'react-drag-sortable';
import { withStyles } from 'material-ui/styles';

import withRoot from '../withRoot';
import Header from './Header';
import Outlet from './Outlet';
import Alert from '../Alert';
import Add from './Add';

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    padding: '0 ' + theme.spacing.unit * 5,
    flexDirection: 'column',
    '&::before': {
      display: 'block',
      flex: '0 0 auto',
      content: '\'\'',
      ...theme.mixins.toolbar
    }
  },
  center: {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 400,
    margin: theme.spacing.unit * 2
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  }
});

const generateElement = value => (
  { content: value }
);

const Main = ({ classes, infoMessage, handleAddOutlet }) => {
  const listGrid = [0, 1, 2, 3, 4 , 5, 6, 7, 8, 9, 10].map(value => (
    generateElement(<Outlet className={classes.card} title={value} />)
  ));

  console.log(listGrid);

  return (
    <div>
      <Header />
      <div className={classes.root}>
        <DragSortableList items={listGrid} dropBackTransitionDuration={0.3} type="grid" />
      </div>
      <Add className={classes.addButton} onSubmit={handleAddOutlet} />

      {infoMessage && <Alert text={infoMessage} type="info" />}
    </div>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  infoMessage: PropTypes.string
};

export default withRoot(withStyles(styles)(Main));
