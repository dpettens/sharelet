import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class NotAuthentication extends Component {
    componentWillMount = () => {
      if (this.props.authenticated)
        this.props.history.push('/');
    };

    componentWillUpdate = nextProps => {
      if (nextProps.authenticated)
        this.props.history.push('/');
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  NotAuthentication.PropTypes = {
    history: PropTypes.object,
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(NotAuthentication);
};
