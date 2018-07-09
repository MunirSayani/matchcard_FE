import React from 'react';
import { connect } from 'react-redux';
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
  // isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps() {
  return {
    // isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(HomePage);
