import { connect } from "react-redux";
import NavBar from "./NavBar";
import { logout } from "../../actions/session";

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  room: state.room.current
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
