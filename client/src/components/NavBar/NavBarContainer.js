import { connect } from "react-redux";
import NavBar from "./NavBar";

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
