import { connect } from "react-redux";
import Chat from "./Chat";
import { receiveRooms } from "../../actions/room";
import { receiveMessages, receiveMessage } from "../../actions/message";
import { receiveUsers } from "../../actions/users";

const mapStateToProps = state => ({
  room: state.room,
  session: state.session,
  messages: state.message.room,
  users: state.user.all
});

const mapDispatchToProps = dispatch => ({
  receiveRooms: rooms => dispatch(receiveRooms(rooms)),
  receiveMessages: messages => dispatch(receiveMessages(messages)),
  receiveMessage: message => dispatch(receiveMessage(message)),
  receiveUsers: users => dispatch(receiveUsers(users))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
