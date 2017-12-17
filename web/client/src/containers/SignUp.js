import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import Main from '../components/auth/Main';
import SignUpForm from '../components/auth/SignUpForm';

class SignUp extends Component {
  submit = (values) => {
    this.props.signUp(values, this.props.history);
  };

  render = () => {
    return(
      <Main type="signup">
        <SignUpForm onSubmit={this.submit} />
      </Main>
    );
  };
}

SignUp.PropTypes = {
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    signUp: (values, history) => {
      dispatch(signUp(values, history))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
