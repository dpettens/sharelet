import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from '../components/home/Main';

class HomePage extends Component {
  render = () => {
    const { authenticated, location } = this.props;

    return (
      <Main authenticated={authenticated} location={location} />
    );
  };
}

HomePage.PropTypes = {
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
