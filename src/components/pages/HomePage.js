import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeaturedMatchCardsContainer from '../featured/FeaturedMatchCardsContainer';

class HomePage extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <FeaturedMatchCardsContainer />
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(HomePage);
