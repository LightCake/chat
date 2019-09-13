import { connect } from "react-redux";
import Register from "./Register";
import { register, receiveErrors, clearErrors } from "../../actions/session";

const mapStateToProps = state => ({
  errors: state.error.session
});

const mapDispatchToProps = dispatch => ({
  register: (user, history) => dispatch(register(user, history)),
  receiveErrors: errors => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
