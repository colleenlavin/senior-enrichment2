import React, { Component } from 'react';
import axios from 'axios'
import store from '../store'
import { Link } from 'react-router'


import NavBar from "./NavBar"


export default class Campus extends Component {

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

    handleClick(event) {
        const studentId = event.target.value
        axios.delete(`/api/students/${event.target.value}`)
            .then(res => {
                const students = this.state.students.filter(student => {
                    return student.id != studentId
                })
                this.setState({ students: students })
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        const newStudentName = event.target.name.value
        const newStudentEmail = event.target.email.value
        const newStudentCampus = this.state.selectedCampus.id
        axios.post(`/api/students/newstudent`, { name: newStudentName, email: newStudentEmail, campusId: newStudentCampus })
            .then(res => {
                this.state.students.push(res.data);
                this.setState({ students: this.state.students })
            })
    }

    render() {
        return (
            <div className='background'>
                <NavBar />
                <p className="text">{this.state.selectedCampus.name} Campus</p>
                <h1>Students</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>DELETE</th>
                        </tr>
                        {this.state.students.map(student => {
                            return student.campusId === this.state.selectedCampus.id ?
                                <tr key={student.id} >
                                    <td>{student.id}</td>
                                    <td > <Link to={`/students/${student.id}`}>{student.name}</Link> </td>
                                    <td>{student.email}</td>
                                    <td><button value={student.id} onClick={this.handleClick} > X
                            </button> </td>
                                </tr> : null
                        })}
                    </tbody>
                </table>

                {/*<table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                        </tr>
                      {this.state.students.map(student =>{
                         return student.campusId === this.state.selectedCampus.id ?
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>
                                        <Link to={`/students/${student.id}`}>
                                            {student.name}
                                        </Link>
                                    </td>
                                    <td>{student.email}</td>
                                    <td>{this.state.campuses.map(campus => {
                                        return campus.id === student.campusId ? campus.name : null
                                    })}</td>
                                    <td><button value={student.id} onClick={this.handleClick}>
                                        X
                                        </button>
                                    </td>
                                </tr>)}
                        <Link to={`/students/${selectedStudent.id}/editstudent`}> <button id='button' onClick={this.handleClick}> Edit Student </button> </Link>
                    </tbody>
                </table>*/}
                <form id="form" onSubmit={this.handleSubmit}>
                    <div> Add New Student </div>
                    <div>
                        <label> Student Name: </label>
                        <input name='name' value={this.state.value} />
                    </div>
                    <div>
                        <label> Student Email: </label>
                        <input name='email' value={this.state.value} />
                    </div>
                    <div> <button>Submit</button> </div>
                </form>

            </div>
        )
    }
}