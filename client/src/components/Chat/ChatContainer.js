import { connect } from "react-redux";
import Chat from "./Chat";
import { receiveRooms } from "../../actions/room";

const mapStateToProps = state => ({
  current: state.room.current,
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({
  receiveRooms: rooms => dispatch(receiveRooms(rooms))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
