import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class EditMatchCardForm extends React.Component {
  state = {
    data: {
      match_card: {}
    },
    loading: false,
    savedData: true,
    errors: {}
  };

  componentDidMount() {
    this.setState({
      data: this.props.match_card
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      savedData: false,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .then(() => {
          this.setState({
            loading: false,
            savedData: true
          });
        })
        .catch(err => {
          this.setState({
            errors: err.response.data.errors,
            loading: false
          });
        });
    }
  };

  validate = data => {
    const errors = {};

    if (!data.title) errors.title = "Can't be blank";

    return errors;
  };

  render() {
    const { data, loading, errors, savedData } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {savedData && <Message>Success!</Message>}
        {errors.global && (
          <Message negative>
            <Message.Header>
              {' '}
              There were errors processing the request.{' '}
            </Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="title"
            id="title"
            name="title"
            placeholder="your new title"
            defaultValue={data.title}
            onChange={this.onChange}
          />
          {errors.title && <InlineError text={errors.title} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

EditMatchCardForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default EditMatchCardForm;
