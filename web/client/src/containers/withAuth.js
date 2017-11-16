import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Authentication extends Component {
    componentWillMount = () => {
      if (!this.props.authenticated)
        this.props.history.push('/signin');
    };

    componentWillUpdate = nextProps => {
      if (!nextProps.authenticated)
        this.props.history.push('/signin');
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.PropTypes = {
    history: PropTypes.object,
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(Authentication);
};
