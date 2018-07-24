import React from 'react';
import _ from 'lodash';
import { Form, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import update from 'immutability-helper';

class MatchQuestionsForm extends React.Component {
  state = {
    data: {}
    // errors: {}
  };

  componentWillMount() {
    this.setQuestionState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setQuestionState(nextProps);
  }

  onChange = e => {
    const { data } = this.state;
    const { questions } = data;
    const { target } = e;
    
    console.log("target", target);

    // const index = questions.findIndex(q => q.id === target.id);
    const updatedQuestions = _.map(questions, q => {
      const stateItem = q;

      // eslint-disable-next-line
      if (q.id == target.id) {
        stateItem.question = {
          ...stateItem.question,
          [target.name]: target.value
        };
        console.log('state item', stateItem);
      }

      return stateItem;
    });

    this.setState({ data: { questions: updatedQuestions } }, () =>
      this.handleQuestionChange()
    );
  };

  setQuestionState(nextProps) {
    const { questions } = nextProps;

    const desginedQuestions = _.map(
      questions,
      element => {
        const q = { id: Math.random(), question: element };
        return q;
      }
      //   _.extend({}, element, { id: Math.random() })
    );

    this.setState({
      data: { questions: desginedQuestions }
    });
  }

  handleQuestionChange = () => {
    const { handleQuestionChange, match } = this.props;
    const { data } = this.state;
    const QuestionList = _.map(data.questions, 'question');
    handleQuestionChange(QuestionList, match.id);
  };

  deleteQuestion = matchId => {
    const { data } = this.state;
    const { questions } = data;

    const updatedQuestions = _.reject(questions, { id: matchId });

    this.setState(
      {
        data: { questions: updatedQuestions }
      },
      () => this.handleQuestionChange()
    );
  };
  
  optionsForAnswerType = () => {
    const { entities } = this.props;
    // const contenderType = _.result(
    //   _.find(entities, { name: matchType, entity_type: "Answer type" }),
    //   'contender_type'
    // );
    
    const options = _.filter(entities, {
      entity_type: "Answer Type"
    }).map(e => ({ value: e.name, text: e.name }));
    
    return options;
  };

  renderQuestions = q => {
    // eslint-disable-next-line
    // const id = Math.random();
    const { id, question } = q;
    const answerTypeOptions = this.optionsForAnswerType();
    
    // console.log(answerTypeOptions);
    
    return (
      <div key={id} className="ui stackable grid">
        <div className="eight wide column">
          <Form.Field>
            <label htmlFor="content">Content</label>
            <input
              type="text"
              id={id}
              name="content"
              placeholder="your new content"
              defaultValue={question.content}
              onBlur={this.onChange}
            />
          </Form.Field>
        </div>
        <div className="four wide column">
          <Form.Field>
            <label htmlFor="answer_type">Answer Type</label>
            <Dropdown
              id={id}
              placeholder="Select..."
              name="answer_type"
              selection
              search
              options={answerTypeOptions}
              defaultValue={question.answer_type}
              onChange={(event, data) => {
                const e = {
                  target: {
                    id: data.id,
                    name: "answer_type",
                    value: data.value
                  }
                };
                this.onChange(e);
              }}
            />
          </Form.Field>
        </div>
        <div className="two wide column">
          <Form.Field>
            <label htmlFor="point_value">Point Value</label>
            <input
              type="text"
              id={id}
              name="point_value"
              placeholder="Enter a number"
              defaultValue={question.point_value}
              onBlur={this.onChange}
            />
          </Form.Field>
        </div>
        <div className="two wide column">
          <i
            onClick={() => this.deleteQuestion(id)}
            aria-hidden="true"
            className="delete icon red link middle aligned"
          />
        </div>
      </div>
    );
  };

  render() {
    const { data } = this.state;
    const { questions } = data;

    return (
      <div className="column">
        {/* <br />
        <div>
          <b> Match Questions Form </b>
        </div> */}

        {questions.map(q => this.renderQuestions(q))}
        <br />
      </div>
    );
  }
}

MatchQuestionsForm.propTypes = {
  handleQuestionChange: PropTypes.func.isRequired,
  // contenders: PropTypes.arrayOf({
  //   id: PropTypes.number,
  //   name: PropTypes.string
  // }),
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      entity_type: PropTypes.string,
      contender_count: PropTypes.number,
      contender_type: PropTypes.string
    })
  ).isRequired,
  match: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired
  }).isRequired
  //   token: PropTypes.string.isRequired
};

export default MatchQuestionsForm;
