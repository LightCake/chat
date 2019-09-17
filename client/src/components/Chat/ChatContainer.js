import { connect } from "react-redux";
import Chat from "./Chat";
import {
  receiveRooms,
  updateUsers,
  joinRoom,
  addRoom
} from "../../actions/room";
import { receiveMessages, receiveMessage } from "../../actions/message";
import { receiveUsers, receiveUser, removeUser } from "../../actions/users";

const mapStateToProps = state => ({
  rooms: state.room,
  session: state.session,
  messages: state.message.room,
  users: state.user.all
});

const mapDispatchToProps = dispatch => ({
  receiveRooms: rooms => dispatch(receiveRooms(rooms)),
  receiveMessages: messages => dispatch(receiveMessages(messages)),
  receiveMessage: message => dispatch(receiveMessage(message)),
  receiveUsers: users => dispatch(receiveUsers(users)),
  updateUsers: room => dispatch(updateUsers(room)),
  receiveUser: user => dispatch(receiveUser(user)),
  removeUser: user => dispatch(removeUser(user)),
  joinRoom: room => dispatch(joinRoom(room)),
  addRoom: room => dispatch(addRoom(room))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
