import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOutlet, getOutlets, updateUser } from '../actions';
import Main from '../components/dashboard/Main';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null
    };
  };

  componentDidMount = () => {
    this.props.getOutlets();

    // const intervalId = setInterval(() => {
    //   this.props.getOutlets();
    // }, 10*1000);

    // this.setState({
    //   intervalId: intervalId
    // });
  };

  componentWillUnmount = () => {
    //clearInterval(this.state.intervalId);
  };

  handleAddOutlet = values => {
    this.props.addOutlet(values);
  };

  handleUpdateUser = values => {
    this.props.updateUser(values);
  };

  render = () => {
    const { firstname, lastname, outlets } = this.props;

    return (
      <Main
        firstname={firstname}
        handleAddOutlet={this.handleAddOutlet}
        handleUpdateUser={this.handleUpdateUser}
        lastname={lastname}
        outlets={outlets}
      />
    );
  };
}

Dashboard.PropTypes = {
  addOutlet: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  getOutlets: PropTypes.func.isRequired,
  lastname: PropTypes.string.isRequired,
  outlets: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  firstname: state.user.firstname,
  lastname: state.user.lastname,
  outlets: state.outlets
});

const mapDispatchToProps = dispatch => {
  return {
    addOutlet: values => {
      dispatch(addOutlet(values))
    },
    getOutlets: () => {
      dispatch(getOutlets())
    },
    updateUser: values => {
      dispatch(updateUser(values))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
