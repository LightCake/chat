import { connect } from "react-redux";
import NavBar from "./NavBar";

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  room: state.room.current
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
