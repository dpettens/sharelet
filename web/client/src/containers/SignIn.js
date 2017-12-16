import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import Main from '../components/auth/Main';
import SignInForm from '../components/auth/SignInForm';

class SignIn extends Component {
  submit = (values) => {
    this.props.signIn(values, this.props.history);
  };

  render = () => {
    return(
      <Main type="signin">
        <SignInForm onSubmit={this.submit} />
      </Main>
    );
  };
}

SignIn.PropTypes = {
  signIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    signIn: (values, history) => {
      dispatch(signIn(values, history))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
