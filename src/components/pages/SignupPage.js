import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';

class SignupPage extends React.Component {
  submit = data => {
    const { signup, history } = this.props;
    return signup(data).then(() => history.push('/dashboard'));
  };

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  null,
  { signup }
)(SignupPage);
