import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { loadMatchCard } from '../../actions/match_card';
import { loadEntities } from '../../actions/entities';


// eslint-disable-next-line
class EntryPage extends React.Component {
  state = {
     // eslint-disable-next-line
    loading: true,
    // eslint-disable-next-line
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
    
  render() {
    const { loading, success } = this.state;
    console.log(loading);
    console.log(success);
    // eslint-disable-next-line
    const { match_card } = this.props;
    
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
        <h1> {match_card.title} </h1>
        // <SubmitEntryForm
        //   submit={this.submit}
        //   // eslint-disable-next-line
        //   match_card={match_card}
        //   entities={entities}
        //   onChange={this.onChange}
        //   newMatch={this.newMatch}
        // />
      )}
    {!loading && !success && <Message>Oops! something went wrong.</Message>}    
     </div>     
    )
  }
}

EntryPage.propTypes = {
  loadMatchCard: PropTypes.func.isRequired,
  loadEntities: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    match_card: state.match_card
  };
}

export default connect(
  mapStateToProps,
  { loadMatchCard, loadEntities }
)(EntryPage);

