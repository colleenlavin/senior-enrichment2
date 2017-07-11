import Campuses from '../components/campuses';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses.list
  };
};

const CampusesContainer = connect(
  mapStateToProps
)(Campuses);

export default CampusesContainer;