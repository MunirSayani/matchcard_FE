import React, { Component } from 'react'
import axios from 'axios'

class PayPerViewFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.payperview.title,
      body: this.props.payperview.body
    }
  }
  
  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  handleBlur = () => {
    const payperview = {
      title: this.state.title,
      body: this.state.body
    }
    
    axios.put(
      process.env.REACT_APP_API_URL + '/pay_per_views',
      {
        payperview: payperview
      }
    )
  }
  
  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className='input' type="text"
            name="title" placeholder='Enter a Title' 
            value={this.state.title} onChange={this.handleInput} />
          <textarea className='input' name="body"
            placeholder='Describe your idea'
            value={this.state.body} onChange={this.handleInput}></textarea>
        </form>
      </div>
    );
  }
}
  
    
export default PayPerViewFrom