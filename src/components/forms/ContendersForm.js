import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import update from 'immutability-helper';
// import InlineError from '../messages/InlineError';

class ContendersForm extends React.Component {
  state = {
    data: {}
    // errors: {}
  };

  componentWillMount() {
    this.setContenderState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setContenderState(nextProps);
  }

  onChange = e => {
    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));
  };
  
  onContenderChange = (target) => {
    const { data } = this.state;
    const { contenders } =  data;
    
    const index = contenders.findIndex((c) => c.id === target.id);
    const updatedContenders = update(contenders, {$splice: [[index, 1, target]]}); 

    this.setState( { data: {contenders: updatedContenders } }, () => this.handleContenderChange())
  }
  
  setContenderState(nextProps) {
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
      const designedContenders = _.times(entity.contender_count, () => {
        const q = { id: Math.random(), name: '' };
        return q;
      });
      this.setState({ data: { contenders: designedContenders } });
    }
  }
  
  handleContenderChange = () => {
    const { handleContenderChange, match } = this.props;
    const { data } = this.state;
    const contenderList = _.map(data.contenders, 'name');
    handleContenderChange(contenderList, match.id);
  }
  
  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  optionsForContender = (matchType) => {
    const { entities } = this.props;
    const contenderType = _.result(_.find(entities, { 'name': matchType }), 'contender_type');
    const options = _.filter(entities, 
      {entity_type: 'Contender', contender_type: contenderType }
    ).map(e => ({ value: e.name, text: e.name }));
    return options
  }

  renderContenders = c => {
    const { match }  = this.props;
    const options = this.optionsForContender(match.match_type)

    // eslint-disable-next-line
    const id = Math.random();
    return (
      <div key={id} className= "ui padded grid">
        <div className="one column row">
          <Dropdown
            id={c.id}
            placeholder="Select..."
            name="match_type"
            selection
            search
            options={options}
            defaultValue={c.name}
            onChange={(event, data) => {
              const target = {
                id: data.id,
                name: data.value
              };
              this.onContenderChange(target);
            }}
          />
        </div>
      </div>
    );
  };

  render() {
    const { data } = this.state;

    const { contenders } = data;
    return (
      <div>
        <br />
        <b> Contenders </b>
        {contenders.map(c => this.renderContenders(c))}
      </div>
    );
  }
}

ContendersForm.propTypes = {
  handleContenderChange: PropTypes.func.isRequired,
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

export default ContendersForm;
