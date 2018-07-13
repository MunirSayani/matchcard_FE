import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
// import InlineError from '../messages/InlineError';

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

  componentWillMount() {
    this.handleContenderState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('GOT PROPS!');
    this.handleContenderState(nextProps);
  }

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

  handleContenderState(nextProps) {
    const { contenders, entities, match } = nextProps;

    const entity = _.find(entities, { name: match.match_type });

    if (
      !_.isEmpty(contenders) &&
      entity.contender_count === contenders.length
    ) {
      const designedContenders = _.map(contenders, c => {
        const q = { id: Math.random(), name: c };
        return q;
      });

      this.setState({ data: { contenders: designedContenders } });
    } else {
      console.log('contenders should be: ', entity.contender_count);
      const designedContenders = _.times(entity.contender_count, () => {
        const q = { id: Math.random(), name: 'test2' };
        return q;
      });
      this.setState({ data: { contenders: designedContenders } });
    }
  }

  renderContenders = c => {
    const options = [
      { value: 'contender1', text: 'contender1' },
      { value: 'contender 2', text: 'contender 2' },
      { value: 'test1', text: 'test1' },
      { value: 'test2', text: 'test2' }
    ];
    // eslint-disable-next-line
    const id = Math.random();
    return (
      <div key={id} className="one column row">
        <Dropdown
          id={c.id}
          placeholder="Select..."
          name="match_type"
          selection
          search
          options={options}
          defaultValue={c.name}
          // onChange={(event, data) => {
          //   const e = {
          //     target: {
          //       id: data.id,
          //       name: data.name,
          //       value: data.value
          //     }
          //   };
          //   this.changeMatchAttributes(e);
          // }}
        />
      </div>
    );
  };

  render() {
    const { errors, data, loading } = this.state;
    console.log(errors);
    // console.log(data);
    console.log(loading);

    const { contenders } = data;
    return (
      <div>
        Match Contenders :
        {contenders.map(c => this.renderContenders(c))}
      </div>

      //   <Form onSubmit={this.onSubmit} loading={loading}>
      //     <Button primary>Reset</Button>
      //   </Form>
    );
  }
}

// renderContenders = (matchType, key) => {
//   const { entities } = this.props;
//   const options = entities.map(e => ({ value: e.name, text: e.name }));

//   return (
//     <div>
//       <label htmlFor="type" name="test">
//         Match Type
//       </label>{' '}
//       <br />
//       <Dropdown
//         id={key}
//         placeholder="Select..."
//         name="match_type"
//         selection
//         search
//         options={options}
//         defaultValue={matchType}
//         onChange={(event, data) => {
//           const e = {
//             target: {
//               id: data.id,
//               name: data.name,
//               value: data.value
//             }
//           };
//           this.changeContenders(e);
//         }}
//       />
//     </div>
//   );
// };

ContendersForm.propTypes = {
  submit: PropTypes.func.isRequired
  // contenders: PropTypes.arrayOf({
  //   id: PropTypes.number,
  //   name: PropTypes.string
  // }).isRequired,
  // entities: PropTypes.arrayOf({
  //   id: PropTypes.number,
  //   name: PropTypes.string
  // }).isRequired
  // match: PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string.isRequired
  // }).isRequired
  //   token: PropTypes.string.isRequired
};

export default ContendersForm;
