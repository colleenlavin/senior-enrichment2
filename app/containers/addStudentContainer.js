import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddStudent from '../components/AddStudent';
import { addSongToPlaylist } from '../action-creators/playlists';
import { loadAllSongs } from '../action-creators/songs';

const mapStateToProps = state => {
  return {
    students: state.students,
    selectedCampus: state.campuses.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit (campusId, studentId) {
      return dispatch(addSongToPlaylist(campusId, studentId));
    }
  };
};

class AddStudentContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      studentId: 1,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {
    this.setState({
      studentId: evt.target.value,
      error: false
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const playlistId = this.props.selectedPlaylist.id;
    const studentId = this.state.studentId;
    this.props.handleSubmit(playlistId, studentId)
      .catch(err => {
        this.setState({ error: true })
      });
  }

  render () {
    return (
      <AddStudent
        {...this.state}
        {...this.props}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentContainer);