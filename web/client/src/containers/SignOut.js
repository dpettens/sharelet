import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import SignOutDialog from '../components/auth/SignOutDialog';

class SignOut extends Component {
  handleDisagree = () => {
    this.props.history.goBack();
  };

  handleSignOut = () => {
    this.props.signOut(this.props.history);
  };

  render = () => {
    return(
      <SignOutDialog handleDisagree={this.handleDisagree} handleSignOut={this.handleSignOut} />
    );
  };
}

SignOut.PropTypes = {
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    signOut: (history) => {
      dispatch(signOut(history))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
