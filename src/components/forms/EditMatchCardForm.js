import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import { deleteMatch, createMatch } from '../../actions/match_card';
import '../../styles/_app.scss';

class EditMatchCardForm extends React.Component {
  state = {
    data: {
      match_card: {},
      matches: {}
    },
    loading: false,
    savedData: false,
    errors: {}
  };

  componentWillMount() {
    // eslint-disable-next-line
    const { match_card } = this.props;
    this.setState({
      data: {
        title: match_card.title,
        id: match_card.id,
        matches: match_card.matches
      }
    });
  }

  componentWillReceiveProps(newProps) {
    // eslint-disable-next-line
    const { match_card } = newProps;
    this.setState({
      data: {
        title: match_card.title,
        id: match_card.id,
        matches: match_card.matches
      }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    const { data } = this.state;

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      submit(data)
        .then(() => {
          this.setState({
            loading: false,
            savedData: true
          });
        })
        .catch(err => {
          console.log('got error', err);
          this.setState({
            errors: err.response.data.errors,
            loading: false
          });
        });
    }
  };

  onChange = e => {
    const { target } = e;

    this.setState(prevState => ({
      ...prevState,
      savedData: false,
      data: { ...prevState.data, [target.name]: target.value }
    }));
  };

  changeMatchAttributes = e => {
    const { target } = e;

    this.setState(prevState => ({
      ...prevState,
      savedData: false,
      data: {
        ...prevState.data,
        matches: {
          ...prevState.data.matches,
          [target.id]: {
            ...prevState.data.matches[target.id],
            [target.name]: target.value
          }
        }
      }
    }));
  };

  validate = data => {
    const errors = {};

    if (!data.title) errors.title = "Can't be blank";

    return errors;
  };

  newMatch = e => {
    e.preventDefault();
    const { createMatch } = this.props;
    const { data } = this.state;

    createMatch({ match: { match_card_id: data.id } }).catch(err => {
      console.log(err);

      // TODO CATCH ERROR
    });
  };

  handleDeleteMatch = id => {
    const { deleteMatch } = this.props;

    deleteMatch(id).catch(err => {
      console.log(err);

      // TODO CATCH ERROR
    });
  };

  renderMatches = (matches, errors) =>
    Object.keys(matches).map(key => (
      <Form.Field key={key} className="inline">
        {/* error={!_.isEmpty(errors[key])} */}
        <label htmlFor="Name">Match Name</label>
        <input
          type="name"
          id={key}
          name="name"
          placeholder="Match Name"
          defaultValue={matches[key].name}
          onChange={this.changeMatchAttributes}
        />
        {!_.isEmpty(errors[key]) && (
          <div
            className="ui red left pointing basic label"
            style={{ backgroundColor: '#fff !important' }}
          >
            Please enter a value
          </div>
        )}
        <i
          onClick={() => this.handleDeleteMatch(key)}
          aria-hidden="true"
          className="delete icon red link"
        />
        {console.log(errors[key])}
        {/* {!_.isEmpty(errors[key]) && <InlineError text={errors[key].name} />} */}
      </Form.Field>
    ));

  render() {
    const { data, loading, errors, savedData } = this.state;

    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={loading} className="container">
          {savedData && (
            <Message className="ui positive message">Success!</Message>
          )}
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
          {this.renderMatches(data.matches, errors)}
          <Button onClick={this.newMatch}>Add Match</Button>
          <Button primary>Save</Button>
        </Form>
      </div>
    );
  }
}

EditMatchCardForm.propTypes = {
  submit: PropTypes.func.isRequired,
  createMatch: PropTypes.func.isRequired,
  deleteMatch: PropTypes.func.isRequired,
  match_card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    league_id: PropTypes.string.isRequired,
    matches: PropTypes.shape(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    match_card: state.match_card
  };
}

export default connect(
  mapStateToProps,
  { deleteMatch, createMatch }
)(EditMatchCardForm);
