import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { validateToken, resetPassword } from '../../actions/auth';

class ResetPasswordPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    const { validateToken, match } = this.props;
    validateToken(match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data => {
    const { resetPassword, history } = this.props;
    return resetPassword(data).then(() => history.push('/login'));
  };

  render() {
    const { loading, success } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { token } = params;

    return (
      <div>
        {loading && <Message>Loading</Message>}
        {!loading &&
          success && <ResetPasswordForm submit={this.submit} token={token} />}
        {!loading && !success && <Message>Invalid Token</Message>}
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  null,
  { validateToken, resetPassword }
)(ResetPasswordPage);
