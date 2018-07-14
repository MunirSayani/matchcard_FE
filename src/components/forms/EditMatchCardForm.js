import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button, Message, Dropdown } from 'semantic-ui-react';
import ContendersForm from './ContendersForm';
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
    const { entities } = this.props;

    if (!data.title) errors.title = "Can't be blank";

    _.forOwn(data.matches, (value, key) => {
      // const contendersList = _.map(value.contenders, 'name');
      console.log(value.contenders);
      const entity = _.find(entities, { name: value.match_type });
      if (!value.name) errors[key] = { name: "Can't be blank" };
      if (
        value.contenders.length !== _.compact(value.contenders).length ||
        _.compact(value.contenders).length === 0 ||
        entity.contender_count !== value.contenders.length
      )
        errors[key] = { contenders: 'Contenders must be selected.' };
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

  handleDeleteMatch = id => {
    const { deleteMatch } = this.props;

    deleteMatch(id).catch(() => {
      // TODO CATCH ERROR
    });
  };

  handleContenderChange = (contenders, matchID) => {
    const e = {
      target: {
        id: matchID,
        name: 'contenders',
        value: contenders
      }
    };

    this.changeMatchAttributes(e);
  };

  renderMatchType = (matchType, key) => {
    const { entities } = this.props;
    const options = _.filter(entities, { entity_type: 'Match' }).map(e => ({
      value: e.name,
      text: e.name
    }));

    return (
      <div className="field">
        <label htmlFor="type" name="test">
          Match Type
        </label>
        <Dropdown
          id={key}
          placeholder="Select..."
          name="match_type"
          selection
          search
          options={options}
          defaultValue={matchType}
          onChange={(event, data) => {
            const e = {
              target: {
                id: data.id,
                name: data.name,
                value: data.value
              }
            };
            this.changeMatchAttributes(e);
          }}
        />
      </div>
    );
  };

  renderMatches = (matches, errors) => {
    const { entities } = this.props;
    // console.log(entities);

    return Object.keys(matches).map(key => (
      <div className="ui padded segment center" key={key}>
        <i className="ui right corner label link" type="link">
          <i
            onClick={() => this.handleDeleteMatch(key)}
            aria-hidden="true"
            className="delete icon red link"
          />
        </i>

        <div className="ui grid">
          <div className="doubling two column row">
            <div className="left floated column">
              <Form.Field error={_.get(errors[key], 'name')}>
                <label htmlFor="Name">
                  Match Name{_.get(errors[key], 'name') && (
                    <div
                      className="ui red left pointing basic label"
                      style={{ backgroundColor: '#fff !important' }}
                    >
                      {errors[key].name}
                    </div>
                  )}
                </label>

                <input
                  type="text"
                  id={key}
                  name="name"
                  placeholder="Match Name"
                  defaultValue={matches[key].name}
                  onChange={this.changeMatchAttributes}
                />
                {/* {!_.isEmpty(errors[key]) && <InlineError text={errors[key].name} />} */}
              </Form.Field>
            </div>
            <div className="right floated column">
              {this.renderMatchType(matches[key].match_type, key)}
            </div>
          </div>
          <div className="ui grid">
            {
              <ContendersForm
                contenders={matches[key].contenders}
                match={matches[key]}
                entities={entities}
                handleContenderChange={this.handleContenderChange}
                cerrors={_.isEmpty(errors[key]) ? {} : errors[key]}
              />
            }
            {/* <div className="ui column padded">
              <Button onClick={() => this.newContender(key)}>
                Add Contender
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    ));
  };

  render() {
    const { data, loading, errors, savedData } = this.state;
    // const { entities } = this.props;

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
              type="text"
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
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      contender_count: PropTypes.number
    })
  ).isRequired,
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
