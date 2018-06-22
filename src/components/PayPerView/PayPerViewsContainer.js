import React, { Component } from 'react'
import axios from 'axios'
import PayPerView from './PayPerView'
import update from 'immutability-helper'
import PayPerViewForm from './PayPerViewForm'

class PayPerViewsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payperviews: [],
            editingPayPerViewId: null
        }
    }
    
    componentDidMount() {
        var url = process.env.REACT_APP_API_URL + "/pay_per_views.json"
        axios.get(url)
        .then(response => {
          this.setState({payperviews: response.data })
        })
        .catch(error => console.log(error))
    }
    
    addNewPayPerView = () => {
      var url = process.env.REACT_APP_API_URL + "/pay_per_views"
      axios.post(
        url,
        { pay_per_view:{ title: '', body: ''} }
      )
      .then(response => {
        console.log(response)
        const payperviews = update(this.state.payperviews, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          payperviews: payperviews,
          editingPayPerViewId: response.data.id
        })
      })
      .catch(error => console.log(error))
    }
    
    updatePayPerView = () => {
      
    }
    
    render() {
      return (
        <div>
          <button className="newPayPerViewButton"
            onClick={this.addNewPayPerView}>
            New Pay-Per-View
          </button>
          <div>
            { 
              this.state.payperviews.map((payperview) => {
                if(this.state.editingPayPerViewId === payperview.id) {
                  return (<PayPerViewForm payperview={payperview} key={payperview.id} updatePayPerView={updatePayPerView} />)
                } else {
                  return(<PayPerView payperview={payperview} key={payperview.id} />)
                }  
              })
            }
          </div>
        </div>
      );   
    }
}

export default PayPerViewsContainer