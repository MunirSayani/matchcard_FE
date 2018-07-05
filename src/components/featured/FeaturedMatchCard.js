import React from 'react';
import placeholder from '../../images/placeholder.jpg';
import PropTypes from 'prop-types';

const FeaturedMatchCard = ({ matchcard }) => (
  <div className="ui card">
    <img alt="placeholder" src={placeholder} className="ui image" />
    <div className="content">
      <div className="header">{matchcard.title}</div>
      <div className="meta">
        <span className="date">{matchcard.created_at}</span>
      </div>
      <div className="description">ID: {matchcard.id}</div>
    </div>
  </div>
);

FeaturedMatchCard.propTypes = {
  matchcard: PropTypes.object
};

export default FeaturedMatchCard;
