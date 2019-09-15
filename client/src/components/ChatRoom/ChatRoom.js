import React from "react";
import PropTypes from "prop-types";
import "./ChatRoom.css";

const ChatRoom = props => {
  const { name, users } = props;
  return (
    <div className="chat_room">
      <div className="chat_room_name">{name}</div>
      <div className="chat_room_users">{users}</div>
    </div>
  );
};

ChatRoom.propTypes = {};

export default ChatRoom;
