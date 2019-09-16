import React from "react";
import PropTypes from "prop-types";
import "./ChatRoom.css";

const ChatRoom = props => {
  const { id, name, users, handleJoin } = props;

  return (
    <button className="chat_room" onClick={handleJoin({ id, name })}>
      <div className="chat_room_name">{name}</div>
      <div className="chat_room_users">{users}</div>
    </button>
  );
};

ChatRoom.propTypes = {};

export default ChatRoom;
