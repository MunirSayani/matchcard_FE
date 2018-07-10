import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button, Message, Dropdown } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import { deleteMatch, createMatch } from '../../actions/match_card';

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
    const { data } = this.state;

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const { submit } = this.props;
      this.setState({ loading: true });
      submit(data)
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
    console.log(target);

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

    _.forOwn(data.matches, (value, key) => {
      if (!value.name) errors[key] = { name: "Can't be blank" };
    });

    return errors;
  };

  newMatch = e => {
    e.preventDefault();
    const { createMatch } = this.props;
    const { data } = this.state;

    createMatch({ match: { match_card_id: data.id } }).catch(() => {
      // TODO CATCH ERROR
    });
  };

  // newContender = key => {
  //   const contender = { name: '' };
  //   const { data } = this.state;
  //   // const updatedMatch = {
  //   //   [key]: data.matches[key].contenders.concat(contender)
  //   // };

  //   const updateContenders = data.matches[key].contenders.concat(contender);

  //   console.log(updateContenders);

  //   this.setState(prevState => ({
  //     ...prevState,
  //     data: {
  //       ...prevState.data,
  //       matches: {
  //         ...prevState.data.matches
  //       }
  //     }
  //   }));
  // };

  handleDeleteMatch = id => {
    const { deleteMatch } = this.props;

    deleteMatch(id).catch(() => {
      // TODO CATCH ERROR
    });
  };

  renderMatchType = matchType => {
    const { entities } = this.props;
    const options = entities.map(e => ({ value: e.name, text: e.name }));

    return (
      <div>
        <label htmlFor="type">Match Type</label> <br />
        <Dropdown
          placeholder="Select..."
          name="match_type"
          selection
          search
          options={options}
          defaultValue={matchType}
          onChange={this.changeMatchAttributes}
        />
      </div>
    );
  };

  renderContenders = contenders =>
    contenders.map(c => <div className="one column row">{c.name}</div>);

  renderMatches = (matches, errors) =>
    Object.keys(matches).map(key => (
      <div className="ui padded segment center" key={key}>
        <i className="ui right corner label link" type="link">
          <i
            onClick={() => this.handleDeleteMatch(key)}
            aria-hidden="true"
            className="delete icon red link"
          />
        </i>

        <div className="ui grid">
          <div className="two column row">
            <div className="left floated column">
              <Form.Field error={!_.isEmpty(errors[key])}>
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
                    {errors[key].name}
                  </div>
                )}
                {/* {!_.isEmpty(errors[key]) && <InlineError text={errors[key].name} />} */}
              </Form.Field>
            </div>
            <div className="right floated column">
              {this.renderMatchType(matches[key].match_type)}
            </div>
          </div>
          <div className="ui padded grid">
            {!!matches[key].contenders &&
              this.renderContenders(matches[key].contenders)}
            {/* <div className="ui column padded">
              <Button onClick={() => this.newContender(key)}>
                Add Contender
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    ));

  render() {
    const { data, loading, errors, savedData } = this.state;
    const { entities } = this.props;

    console.log(entities);

    return (
      <div className="ui container match_card">
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
          <div className="ui padded grid">
            <div className="column">
              {this.renderMatches(data.matches, errors)}
              <div className="ui column padded">
                <Button onClick={this.newMatch}>Add Match</Button>
              </div>
            </div>
          </div>

          <Button className="ui bottom attached button" role="button" primary>
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

EditMatchCardForm.propTypes = {
  submit: PropTypes.func.isRequired,
  createMatch: PropTypes.func.isRequired,
  deleteMatch: PropTypes.func.isRequired,
  entities: PropTypes.arrayOf({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
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
    match_card: state.match_card,
    entities: state.entities
  };
}

export default connect(
  mapStateToProps,
  { deleteMatch, createMatch }
)(EditMatchCardForm);
