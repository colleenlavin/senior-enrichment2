import { FETCH_CAMPUSES, FETCH_CAMPUS, FETCH_STUDENTS, FETCH_STUDENT,FETCH_STUDENTS_AT_CAMPUS, ADD_CAMPUS, EDIT_STUDENT } from '../constants';
import axios from 'axios';

export const getStudents = (students) => {
    return { 
        type: FETCH_STUDENTS, 
        students
    }
};

export const getStudent = (student) => {
    return {
        type: FETCH_STUDENT, 
        student
    }
};
export const receiveStudents = () => dispatch => {
    axios.get('/api/students')
    .then(res => {
        typeof res.data === 'object' ? dispatch(getStudents(res.data)) : window.location.reload();
    })
};


export const receiveStudentById = (studentId) => dispatch => {
    axios.get(`/api/students/${studentId}`)
    .then(res => {
        dispatch(getStudent(res.data))
    })
};

export const editStudent = function(student) {
  return {
    type: 'EDIT_STUDENT',
    student: student
  }
};

export const editOneStudent = function(student, id) {
  return function(dispatch) {
    return axios.put(`/api/students/${id}`, student)
      .then(res => {
        dispatch(editStudent(res.data))
        browserHistory.push('/students')
      })
  }
};
