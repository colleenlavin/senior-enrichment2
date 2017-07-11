import React, { Component } from 'react';
import { connect } from 'react-redux'

import store from '../store'
import { addCampus } from '../action-creators/campuses'

export default class AddCampusForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      image: '',
      location:'',
      description:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    store.dispatch(addCampus(this.state))
  }


  render() {
    return (<form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="campusName">Campus Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campusImage">Campus ImageURL</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  placeholder="image"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campusLocation">Campus Location</label>
                <input
                  type="text"
                  className="location"
                  id="location"
                  placeholder="location"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campusDescription">Campus Description</label>
                <input
                  type="text"
                  className="description"
                  id="description"
                  placeholder="description"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>)
  }
}