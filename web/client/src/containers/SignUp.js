import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signUp, signErrorMessageClear } from '../actions';
import Main from '../components/auth/Main';
import SignUpForm from '../components/auth/SignUpForm';

class SignUp extends Component {
  submit = (values) => {
    this.props.signUp(values, this.props.history);
  };

  componentWillUnmount = () => {
    this.props.signErrorMessageClear();
  };

  render = () => {
    const { errorMessage } = this.props;

    return(
      <Main errorMessage={errorMessage} type="signup">
        <SignUpForm onSubmit={this.submit} />
      </Main>
    );
  };
}

SignUp.PropTypes = {
  errorMessage: PropTypes.string.isRequired,
  signUp: PropTypes.func.isRequired,
  signErrorMessageClear: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    signUp: (values, history) => {
      dispatch(signUp(values, history))
    },
    signErrorMessageClear: () => {
      dispatch(signErrorMessageClear())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
