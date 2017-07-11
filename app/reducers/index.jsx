
import { combineReducers } from 'redux'
import { FETCH_CAMPUSES, FETCH_STUDENTS, FETCH_STUDENT, FETCH_CAMPUS } from '../constants'

const initialState = {
  campuses: [],
  students: [],
  selectedCampus: {},
  selectedStudent: {},
  value: '',
  name: '',
  email: ''

}



const rootReducer = function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case FETCH_CAMPUSES:
      newState.campuses = action.campuses;
      break;

    case FETCH_STUDENTS:
      newState.students = action.students;
      break;

    case FETCH_CAMPUS:
      newState.selectedCampus = action.campus;
      break;

    case FETCH_STUDENT:
      newState.selectedStudent = action.student;
      break;

    default:
      return state;

  }

  return newState;
};

export default rootReducer