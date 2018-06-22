import React, { Component } from 'react'
import { API_ROOT } from '../../api-config';
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
        console.log(window && window.location && window.location.hostname)
    }

    componentDidMount() {
        var url = API_ROOT + "/pay_per_views.json"
        axios.get(url)
        .then(response => {
          this.setState({payperviews: response.data })
        })
        .catch(error => console.log(error))
    }

    addNewPayPerView = () => {
      var url = API_ROOT + "/pay_per_views"
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
      console.log("Updating");
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
                  return (<PayPerViewForm payperview={payperview} key={payperview.id}/>)
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
