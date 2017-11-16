import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollToTopOnMount, SectionsContainer } from 'react-fullpage';
import { withStyles } from 'material-ui/styles';

import withRoot from '../withRoot';
import Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import SectionsControllers from './SectionsControllers';
import Alert from '../Alert';

const styles = theme => ({
  center: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  }
});

/**
 * We need to get the hash of the URI, to allow react-fullpage to render
 * the good slide according to the hash for the first time or the reloading of the page
 */

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };

    this.options = {
      anchors: ['home', 'about', 'contact'],
      arrowNavigation: true,
      navigation: false,
      scrollBar: false,
      verticalAlign: false,
      scrollCallback: (states) => this.setState({ current: states.activeSection })
    };
  };

  componentWillMount = () => {
    const index = this.options.anchors.indexOf(this.props.location.hash.replace('#', ''));
    this.setState(
      (index > 0) ? { current: index } : { current: 0 }
    );
  };

  render = () => {
    const { authenticated, classes, infoMessage } = this.props;
    const { current } = this.state;

    return (
      <div>
        <Header authenticated={authenticated} />
        <ScrollToTopOnMount />
        <SectionsContainer activeSection={current} {...this.options}>
          <Home center={classes.center} />
          <About center={classes.center} />
          <Contact center={classes.center} />
        </SectionsContainer>
        <SectionsControllers
          current={current}
          onNext={() => this.setState({current: current + 1})}
          onPrev={() => this.setState({current: current - 1})}
          sectionsCount={this.options.anchors.length}
        />

        {infoMessage && <Alert text={infoMessage} type="info" />}
      </div>
    );
  };
}

Main.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  infoMessage: PropTypes.string,
  location: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Main));
