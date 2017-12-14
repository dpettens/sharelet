import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addOutlet, signInfoMessageClear } from '../actions';
import Main from '../components/dashboard/Main';

class Dashboard extends Component {
  handleAddOutlet = (values) => {
    this.props.addOutlet(values);
  };

  componentWillUnmount = () => {
    this.props.signInfoMessageClear();
  };

  render = () => {
    const { authenticated, infoMessage } = this.props;

    return (
      <Main authenticated={authenticated} handleAddOutlet={this.handleAddOutlet} infoMessage={infoMessage} />
    );
  };
}

Dashboard.PropTypes = {
  addOutlet: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string.isRequired,
  signInfoMessageClear: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  infoMessage: state.auth.infoMessage
});

const mapDispatchToProps = dispatch => {
  return {
    addOutlet: (values) => {
      dispatch(addOutlet(values))
    },
    signInfoMessageClear: () => {
      dispatch(signInfoMessageClear())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
