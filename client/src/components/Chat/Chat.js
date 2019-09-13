import React from "react";
import PropTypes from "prop-types";
import "./Chat.css";

const Chat = props => {
  const [_, token] = localStorage.getItem("jwtToken").split(" ");
  const URI = encodeURI(`ws://localhost:5000/?token=${token}`);
  const ws = new WebSocket(URI);

  return (
    <div className="chat">
      <div className="chat_rooms">Chat Rooms</div>
      <div className="chat_history">Chat History</div>
      <div className="chat_input_container">Chat Input</div>
      <div className="chat_users">Chat Users</div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
