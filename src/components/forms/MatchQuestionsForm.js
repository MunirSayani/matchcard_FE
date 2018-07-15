import React from 'react';
import _ from 'lodash';
import { Form } from 'semantic-ui-react';
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

    // const index = questions.findIndex(q => q.id === target.id);
    const updatedQuestions = _.map(questions, q => {
      const stateItem = q;
      console.log(stateItem.id);
      console.log(target.id);

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

  renderQuestions = q => {
    // eslint-disable-next-line
    // const id = Math.random();
    const { id, question } = q;
    return (
      <div key={id} className="ui padded grid">
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
        <Form.Field>
          <label htmlFor="point_value">Point Value</label>
          <input
            type="text"
            id={id}
            name="point_value"
            placeholder="your new point_value"
            defaultValue={question.point_value}
            onBlur={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="answer_type">Answer Type</label>
          <input
            type="text"
            id={id}
            name="answer_type"
            placeholder="your new answer_type"
            defaultValue={question.answer_type}
            onBlur={this.onChange}
          />
        </Form.Field>
      </div>
    );
  };

  render() {
    const { data } = this.state;
    const { questions } = data;

    console.log('data', data);
    return (
      <div>
        Match Questions Form
        {questions.map(q => this.renderQuestions(q))}
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
  // entities: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     name: PropTypes.string,
  //     entity_type: PropTypes.string,
  //     contender_count: PropTypes.number,
  //     contender_type: PropTypes.string
  //   })
  // ).isRequired,
  match: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired
  }).isRequired
  //   token: PropTypes.string.isRequired
};

export default MatchQuestionsForm;
