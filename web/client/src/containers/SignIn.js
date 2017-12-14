import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signIn, signErrorMessageClear } from '../actions';
import Main from '../components/auth/Main';
import SignInForm from '../components/auth/SignInForm';

class SignIn extends Component {
  submit = (values) => {
    this.props.signIn(values, this.props.history);
  };

  componentWillUnmount = () => {
    this.props.signErrorMessageClear();
  };

  render = () => {
    const { errorMessage, infoMessage } = this.props;

    return(
      <Main errorMessage={errorMessage} infoMessage={infoMessage} type="signin">
        <SignInForm onSubmit={this.submit} />
      </Main>
    );
  };
}

SignIn.PropTypes = {
  errorMessage: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  signErrorMessageClear: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  infoMessage: state.auth.infoMessage
});

const mapDispatchToProps = dispatch => {
  return {
    signIn: (values, history) => {
      dispatch(signIn(values, history))
    },
    signErrorMessageClear: () => {
      dispatch(signErrorMessageClear())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
