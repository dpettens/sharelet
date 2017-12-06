import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Switch from 'material-ui/Switch';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui-icons/Check';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
  root: {
    width: 1000,
    marginTop: 100,
    overflowX: 'auto',
  },
  table: {
  },
  flex: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class OutletsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "pu45a",
          name: "TV",
          consumption: 0,
          power: false,
          edit: false
        },
        {
          id: "pu86r",
          name: "Frigo",
          consumption: 55,
          power: true,
          edit: false
        },
        {
          id: "pu67d",
          name: "PC",
          consumption: 100,
          power: true,
          edit: false
        },
        {
          id: "pu70b",
          name: "Chambre",
          consumption: 10,
          power: true,
          edit: false
        },
        {
          id: "pu90e",
          name: "Bureau",
          consumption: 0,
          power: false,
          edit: true
        }
      ]
    };
  };

  handleChange = id => (event, checked) => {
    const newData = this.state.data.map(n => {
      if(n.id === id)
        n.power = !n.power;

      return n;
    });

    this.setState({
      data: newData
    });
  };

  edit = id => () => {
    const newData = this.state.data.map(n => {
      if(n.id === id)
        n.edit = true;

      return n;
    });

    this.setState({
      data: newData
    });
  };

  send = id => () => {
    const newData = this.state.data.map(n => {
      if(n.id === id) {
        n.name = this[n.id].input.value;
        n.edit = false;
      }

      return n;
    });

    this.setState({
      data: newData
    });
  };

  delete = id => () => {
    const newData = this.state.data.filter(n => {
      return n.id !== id;
    });

    this.setState({
      data: newData
    });
  };

  render() {
    const { classes } = this.props;

    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell numeric>Consomation actuelle (w)</TableCell>
              <TableCell>État</TableCell>
              <TableCell>Allumer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.id}</TableCell>
                  <TableCell>
                    {(n.edit) ?
                    <Input
                      defaultValue={n.name}
                      inputRef={el => this[n.id] = el}
                    />
                    :
                    <div>
                    <Hidden xlDown>
                      <Input
                        defaultValue={n.name}
                        inputRef={el => this[n.id] = el}
                      />
                    </Hidden>
                    <span>{n.name}</span>
                    </div>}
                  </TableCell>
                  <TableCell numeric>{n.consumption}</TableCell>
                  <TableCell>{(n.power) ? 'Allumé' : 'Éteint'}</TableCell>
                  <TableCell>
                    <Switch
                      checked={n.power}
                      onChange={this.handleChange(n.id)}
                    />
                  </TableCell>
                  <TableCell className={classes.flex}>
                    {!n.edit &&
                      <IconButton onClick={this.edit(n.id)} aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    }
                    {n.edit &&
                      <IconButton onClick={this.send(n.id)} aria-label="OK">
                        <CheckIcon />
                      </IconButton>
                    }
                    <IconButton onClick={this.delete(n.id)} aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  };
};

OutletsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutletsTable);
