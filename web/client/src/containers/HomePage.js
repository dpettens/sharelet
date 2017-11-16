import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signInfoMessageClear } from '../actions';
import Main from '../components/home/Main';

class HomePage extends Component {
  componentWillUnmount = () => {
    this.props.signInfoMessageClear();
  };

  render = () => {
    const { authenticated, infoMessage, location } = this.props;

    return (
      <Main authenticated={authenticated} infoMessage={infoMessage} location={location} />
    );
  };
}

HomePage.PropTypes = {
  authenticated: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
