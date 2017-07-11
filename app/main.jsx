'use strict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect } from 'react-router'

import store from './store'
import Root from './components/Root'





import Home from './components/home'
import Campuses from './components/campuses'
import Students from './components/students'
import Campus from './components/campus'
import Student from './components/student'
import AddCampus from './components/addCampus'
import EditStudent from './components/editStudent'
import addCampusForm from './containers/addCampusContainer'

import { browserHistory, hashHistory } from "react-router"


import axios from "axios"

import { receiveCampuses, receiveCampusById } from './action-creators/campuses'

import{receiveStudents, receiveStudentById} from './action-creators/students'


const onAppEnter = () => {

  const pCampuses = axios.get('/api/campuses');
  const pStudents = axios.get('/api/students');

  return Promise
    .all([pCampuses, pStudents])
    .then(responses => responses.map(r => r.data))
    .then(([campuses, students]) => {
      store.dispatch(receiveCampuses(campuses));
      store.dispatch(receiveStudents(students));
    });
};

const onCampusesEnter = () => {
  const campuses = axios.get('/api/campuses');
  store.dispatch(receiveCampuses(campuses));
}

const onStudentsEnter = () => {
  const students = axios.get('/api/students');
  store.dispatch(receiveStudents(students));
}



const onCampusEnter = function (nextRouterState) {
  const campusId = nextRouterState.params.id;
  const students = axios.get('/api/students');
  const campuses = axios.get('/api/campuses');
  store.dispatch(receiveCampusById(campusId));
  store.dispatch(receiveStudents(students))
  store.dispatch(receiveCampuses(campuses));
};

const onStudentEnter = function (nextRouterState) {
  const studentId = nextRouterState.params.id;
  const campuses = axios.get('/api/campuses');
  store.dispatch(receiveStudentById(studentId));
  store.dispatch(receiveCampuses(campuses));

};


render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={Home} onEnter={onAppEnter} />
      <Route path="/campuses" component={Campuses} onEnter={onCampusesEnter}/>
      <Route path="/campuses/:id" component={Campus} onEnter={onCampusEnter} />
      <Route path="/students" component={Students} onEnter={onStudentsEnter}/>
      <Route path="/students/newstudent" />
      <Route path="/students/:id" component={Student} onEnter={onStudentEnter} />
      <Route path="/campuses/newcampuses" component={AddCampus} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
