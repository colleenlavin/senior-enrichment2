import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'
import { browserHistory } from "react-router"

import NavBar from './NavBar';
import Students from './Students'

import store from '../store'
import { addCampus, getCampuses, receiveCampuses } from '../action-creators/campuses'

export default class Campuses extends Component {

    constructor(props) {
        super(props)
        this.state = store.getState()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    handleSubmit(event) {
        event.preventDefault();
        var newCampus = event.target.campus.value;
        var newImage = event.target.image.value;
        var newLocation = event.target.location.value;
        var newDescription = event.target.description.value;
        axios.post(`/api/campuses/newcampus`, { name: newCampus, image: newImage, location: newLocation, description: newDescription })
            .then(res => {
                console.log(res.data)
                this.state.campuses.push(res.data);
                this.setState({ campuses: this.state.campuses })
                var element1 = document.querySelector('#name');
                element1.value = '';
                var element2 = document.querySelector('#image');
                element2.value = '';
                var element3 = document.querySelector('#location');
                element3.value = '';
                var element4 = document.querySelector('#description');
                element4.value = '';
            })

    }

    handleClick(event) {
        const campusId = event.target.value
        axios.delete(`/api/campuses/${campusId}`)
            .then(res => {
                const campuses = this.state.campuses.filter(campus => {
                    return campus.id != campusId
                })
                this.setState({ campuses: campuses })
            })


    }

    render() {
        return (
            <div className='background'>
                <NavBar />
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>IMAGE</th>
                                <th>LOCATION</th>
                                <th>DESCRIPTION</th>
                                <th>DELETE</th>
                            </tr>
                            {this.state.campuses.map(campus =>
                                <tr key={campus.id}>
                                    <td>{campus.id}</td>
                                    <td>
                                        <Link to={`/campuses/${campus.id}`}>
                                            {campus.name}
                                        </Link>
                                    </td>
                                    <td>{campus.image}</td>
                                    <td>{campus.location}</td>
                                    <td>{campus.description}</td>
                                    <td><button value={campus.id} onClick={this.handleClick}>
                                        X
                                        </button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                {/*Temporary form. Make form its own component/container combo.*/}
                <form id="form" onSubmit={this.handleSubmit}>
                    <div className="text"> Add New Campus </div>
                    <div>
                    <label> Campus Name: </label>
                    <input name='campus' id='name' onChange={this.handleChange} placeholder="Name"/>
                    </div>
                    <div>
                    <label> Image: </label>
                    <input name='image' id='image' onChange={this.handleChange} placeholder="Image"/>
                    </div>
                    <div>
                    <label> Location: </label>
                    <input name='location' id='location' onChange={this.handleChange} placeholder="Location"/>
                    </div>
                    <div>
                    <label> Description: </label>
                    <input name='description' id='description' onChange={this.handleChange} placeholder="Description"/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}