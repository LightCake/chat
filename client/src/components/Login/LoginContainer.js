import { connect } from "react-redux";
import Login from "./Login";
import { login, receiveErrors, clearErrors } from "../../actions/session";

const mapStateToProps = state => ({
  errors: state.error.session
});

const mapDispatchToProps = dispatch => ({
  login: (user, history) => dispatch(login(user, history)),
  receiveErrors: errors => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
