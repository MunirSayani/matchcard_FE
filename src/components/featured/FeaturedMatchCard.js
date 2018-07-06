import React from 'react';
import placeholder from '../../images/placeholder.jpg';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FeaturedMatchCard = ({ matchcard }) => (
  <div className="ui card">
    <img alt="placeholder" src={placeholder} className="ui image" />
    <div className="content">
      <div className="header">{matchcard.title}</div>
      <div className="meta">
        <span className="date">{matchcard.created_at}</span>
      </div>
      <div className="description">
        <Button
          as={Link}
          to={'/edit_match_card/' + matchcard.id}
          className="ui primary"
        >
          {' '}
          Edit{' '}
        </Button>
      </div>
    </div>
  </div>
);

FeaturedMatchCard.propTypes = {
  matchcard: PropTypes.object
};

export default FeaturedMatchCard;
