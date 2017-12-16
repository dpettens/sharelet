import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOutlet } from '../actions';
import Main from '../components/dashboard/Main';

class Dashboard extends Component {
  handleAddOutlet = (values) => {
    this.props.addOutlet(values);
  };

  render = () => {
    const { firstname, lastname, outlets } = this.props;

    return (
      <Main
        firstname={firstname}
        handleAddOutlet={this.handleAddOutlet}
        lastname={lastname}
        outlets={outlets}
      />
    );
  };
}

Dashboard.PropTypes = {
  addOutlet: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  outlets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  firstname: state.user.firstname,
  lastname: state.user.lastname,
  outlets: state.outlets
});

const mapDispatchToProps = dispatch => {
  return {
    addOutlet: (values) => {
      dispatch(addOutlet(values))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
