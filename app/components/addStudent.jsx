import React, { Component } from 'react';

import Students from './students';

export default function AddStudent (props) {

  const students = props.students;
  const error = props.error;
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;

  return (
    <div className="well">
      <form className="form-horizontal" noValidate name="studentSelect" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add to Playlist</legend>
          { error && <div className="alert alert-danger">Student is a duplicate</div> }
          <div className="form-group">
            <label htmlFor="student" className="col-xs-2 control-label">Student</label>
            <div className="col-xs-10">
              <select
                className="form-control"
                name="student"
                required
                onChange={handleChange}>
                {
                  students && students.map(student => (
                    <option key={student.id} value={student.id}>{song.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button type="submit" className="btn btn-success">Add Student</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}