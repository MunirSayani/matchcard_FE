import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeaturedMatchCardsContainer from '../featured/FeaturedMatchCardsContainer';

// eslint-disable-next-line
class HomePage extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <FeaturedMatchCardsContainer isAuthenticated={isAuthenticated}/>
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
