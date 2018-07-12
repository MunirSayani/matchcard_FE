import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { Form, Button } from 'semantic-ui-react';
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
    const { contenders } = this.props;
    
    console.log("recieved:", contenders);
    if (_.isEmpty(contenders)) { 
      console.log("no contenders found")
      const designedContenders = [
        { name: "Auto G 1"},
        { name: "Auto G 1"}
      ]
      this.setState({ data: {contenders: designedContenders } });
      
    } else {
      this.setState({ data: {contenders} });
    }
    
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
  
  renderContenders = contenders =>
    contenders.map(c => <div className="one column row">{c.name}</div>);

  render() {
    const { errors, data, loading } = this.state;
    console.log(errors);
    console.log(data);
    console.log(loading);
    
    const { contenders } = data;
    return (
      <div> 
        Match Contenders :
        
        {this.renderContenders(contenders)}
      </div>
      
      //   <Form onSubmit={this.onSubmit} loading={loading}>
      //     <Button primary>Reset</Button>
      //   </Form>
    );
  }
}

ContendersForm.propTypes = {
  submit: PropTypes.func.isRequired,
  contenders: PropTypes.arrayOf({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired
  //   token: PropTypes.string.isRequired
};

export default ContendersForm;
