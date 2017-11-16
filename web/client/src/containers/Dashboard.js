import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signInfoMessageClear } from '../actions';
import Main from '../components/dashboard/Main';

class Dashboard extends Component {
  componentWillUnmount = () => {
    this.props.signInfoMessageClear();
  };

  render = () => {
    const { authenticated, infoMessage } = this.props;

    return (
      <Main authenticated={authenticated} infoMessage={infoMessage} />
    );
  };
}

Dashboard.PropTypes = {
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
    signInfoMessageClear: () => {
      dispatch(signInfoMessageClear())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
