import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EditMatchCardForm from '../forms/EditMatchCardForm';
import { loadMatchCard, updateMatchCard } from '../../actions/match_card';
import { loadEntities } from '../../actions/entities';

class EditMatchCardPage extends React.Component {
  state = {
    loading: true,
    success: false
    // savedData: false
  };

  componentDidMount() {
    const { loadMatchCard, match, loadEntities } = this.props;
    const { params } = match;
    const { id } = params;
    loadMatchCard(id)
      .then(() => {
        loadEntities().then(() =>
          this.setState({ loading: false, success: true })
        );
      })
      .catch(() => this.setState({ loading: false, success: false }));
  }

  onChange = () =>
    this.setState({
      // savedData: false
    });

  submit = data => {
    const { updateMatchCard } = this.props;

    return updateMatchCard(data).then(() =>
      this.setState({
        loading: false
      })
    );
  };

  render() {
    const { loading, success } = this.state;
    // eslint-disable-next-line
    const { match_card, entities } = this.props;
    // const { params } = match;
    // const { token } = params;

    return (
      <div>
        {loading && (
          <div className="ui active transition visible inverted dimmer">
            <div className="content">
              <div className="ui inverted text loader">Loading</div>
            </div>
          </div>
        )}
        {!loading &&
          success && (
            <EditMatchCardForm
              submit={this.submit}
              // eslint-disable-next-line
              match_card={match_card}
              entities={entities}
              onChange={this.onChange}
              newMatch={this.newMatch}
            />
          )}
        {!loading && !success && <Message>Oops! something went wrong.</Message>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    match_card: state.match_card
  };
}

EditMatchCardPage.propTypes = {
  loadMatchCard: PropTypes.func.isRequired,
  updateMatchCard: PropTypes.func.isRequired,
  loadEntities: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  { loadMatchCard, updateMatchCard, loadEntities }
)(EditMatchCardPage);
