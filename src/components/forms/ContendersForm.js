import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ContendersForm extends React.Component {
  state = {
    data: {
      // eslint-disable-next-line
      //   token: this.props.token,
      //   password: '',
      //   passwordConfirmation: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const { submit } = this.props;

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      submit(data).catch(err =>
        this.setState({ errors: err.response.data.errors, loading: false })
      );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.password = 'Passwords must match';
    return errors;
  };

  render() {
    // const { errors, data, loading } = this.state;

    return (
      <div />
      //   <Form onSubmit={this.onSubmit} loading={loading}>
      //     <Button primary>Reset</Button>
      //   </Form>
    );
  }
}

ContendersForm.propTypes = {
  submit: PropTypes.func.isRequired
  //   token: PropTypes.string.isRequired
};

export default ContendersForm;
