import { FETCH_CAMPUSES, FETCH_CAMPUS, FETCH_STUDENTS, FETCH_STUDENT,FETCH_STUDENTS_AT_CAMPUS, ADD_CAMPUS } from '../constants';
import axios from 'axios';

export const getCampuses = (campuses) => {
    return {
        type: FETCH_CAMPUSES,
        campuses
    }
};

export const getCampus = (campus) => {
    return {
        type: FETCH_CAMPUS, 
        campus
    }
};

export const getStudentsAtCampus = (students) => {
    return {
        type: FETCH_STUDENTS_AT_CAMPUS, 
        students
    }
};

export const addCampus = campus => ({
  type: ADD_CAMPUS,
  campus
});

export const receiveCampuses = () => dispatch => {
    axios.get('/api/campuses')
    .then(res => {
        typeof res.data === 'object' 
    })
};

export const receiveCampusById = (campusId) => dispatch => {
    axios.get(`/api/campuses/${campusId}`)
    .then(res => {
        dispatch(getCampus(res.data))
    })
};
