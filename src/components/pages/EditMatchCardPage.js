import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import EditMatchCardForm from '../forms/EditMatchCardForm';
import { loadMatchCard, updateMatchCard } from '../../actions/match_card';

class EditMatchCardPage extends React.Component {
  state = {
    loading: true,
    success: false,
    savedData: false
  };

  componentDidMount() {
    this.props
      .loadMatchCard(this.props.match.params.id)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  onChange = e =>
    this.setState({
      savedData: false
    });

  submit = data =>
    this.props.updateMatchCard(data).then(() =>
      this.setState({
        loading: false
      })
    );

  render() {
    const { loading, success, savedData } = this.state;
    const token = this.props.match.params.token;

    return (
      <div>
        {loading && <Message>Loading</Message>}
        {!loading &&
          success && (
            <EditMatchCardForm
              submit={this.submit}
              match_card={this.props.match_card}
              onChange={this.onChange}
            />
          )}
        {!loading && !success && <Message>Invalid Token</Message>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    match_card: state.match_card
  };
}

// EditMatchCardPage.propTypes = {
//   validateToken: PropTypes.func.isRequired,
//   resetPassword: PropTypes.func.isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       token: PropTypes.string.isRequired
//     }).isRequired
//   }).isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired
//   }).isRequired
// };

export default connect(
  mapStateToProps,
  { loadMatchCard, updateMatchCard }
)(EditMatchCardPage);
