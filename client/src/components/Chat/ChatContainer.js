import { connect } from "react-redux";
import Chat from "./Chat";
import { receiveRooms } from "../../actions/room";
import { receiveMessages, receiveMessage } from "../../actions/message";

const mapStateToProps = state => ({
  room: state.room,
  user: state.session.user,
  messages: state.message.room
});

const mapDispatchToProps = dispatch => ({
  receiveRooms: rooms => dispatch(receiveRooms(rooms)),
  receiveMessages: messages => dispatch(receiveMessages(messages)),
  receiveMessage: message => dispatch(receiveMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
