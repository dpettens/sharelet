import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeStateOutlet, deleteOutlet, updateOutlet, getDataOutlet } from '../actions';
import OutletCard from '../components/dashboard/OutletCard';

class Outlet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null
    };
  };

  componentDidMount = () => {
    const currentDay =  new Date().toISOString().substring(0, 10);
    const request = {id: this.props.id, date: currentDay};
  };

  handleChangeStateOutlet = () => {
    this.props.changeStateOutlet({id: this.props.id, state: !this.props.state});
  };

  handleDeleteOutlet = () => {
    this.props.deleteOutlet(this.props.id);
  };

  handleDataRequest = () => {
    let date = new Date();
    let format = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    this.props.getDataOutlet({id : this.props.id, date : format});
  }

  handleUpdateOutlet = value => {
    this.props.updateOutlet({id: this.props.id, alias: value.alias});
  };

  render = () => {
    const { alias, id, state, data } = this.props;

    return(
      <OutletCard
        alias={alias}
        handleChangeStateOutlet={this.handleChangeStateOutlet}
        handleDeleteOutlet={this.handleDeleteOutlet}
        handleUpdateOutlet={this.handleUpdateOutlet}
        handleDataRequest={this.handleDataRequest}
        id={id}
        state={state}
        data={data}
      />
    );
  };
}

Outlet.PropTypes = {
  alias: PropTypes.string.isRequired,
  changeStateOutlet: PropTypes.func.isRequired,
  deleteOutlet: PropTypes.func.isRequired,
  getDataOutlet: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  updateOutlet: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  alias: state.outlets[ownProps.id].alias,
  id: ownProps.id,
  state: state.outlets[ownProps.id].state,
  data: state.outlets[ownProps.id].data,
});

const mapDispatchToProps = dispatch => ({
  changeStateOutlet: id => {
    dispatch(changeStateOutlet(id))
  },
  deleteOutlet: id => {
    dispatch(deleteOutlet(id))
  },
  getDataOutlet: request => {
    dispatch(getDataOutlet(request))
  },
  updateOutlet: outlet => {
    dispatch(updateOutlet(outlet))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Outlet);
