import React from 'react';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { loadFeatureMatches } from '../../actions/feature';
import FeaturedMatchCard from './FeaturedMatchCard';

class FeaturedMatchCardsContainer extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    const { loadFeatureMatches } = this.props;

    loadFeatureMatches()
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { matchcards } = this.props;
    const { loading, success } = this.state;

    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
          </Message>
        )}

        {!loading &&
          success && (
            <div className="ui cards">
              {matchcards.map(matchcard => {
                return (
                  <FeaturedMatchCard matchcard={matchcard} key={matchcard.id} />
                );
              })}
            </div>
          )}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Ooops. Something went wrong.</Message.Header>
              </Message.Content>
            </Message>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    matchcards: state.feature.matchcards
  };
}

export default connect(
  mapStateToProps,
  { loadFeatureMatches }
)(FeaturedMatchCardsContainer);
