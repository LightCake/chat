import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Chat.css";

const Chat = props => {
  const { receiveRooms, current, user } = props;

  const [message, setMessage] = useState("");
  // Returned object will persist for the full lifetime of the component.
  const ws = useRef(null);
  // Equivalent to ComponentDidMount lifecycle method
  useEffect(() => {
    const [_, token] = localStorage.getItem("jwtToken").split(" ");
    const URI = encodeURI(`ws://localhost:5000/?token=${token}`);
    ws.current = new WebSocket(URI);

    ws.current.onmessage = message => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case "receive_rooms":
          receiveRooms(data.rooms);
      }
    };
    console.log("Component Did Mount");
    // Equivalent to ComponentWillUnmount lifecycle method
    return () => {};
  }, []);

  const update = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = { type: "send-message", message, room: current, user };
    ws.current.send(JSON.stringify(data));
    setMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_rooms">Chat Rooms</div>
      <div className="chat_history">Chat History</div>
      <div className="chat_input_container">
        <form onSubmit={handleSubmit} className="chat_form">
          <input
            type="text"
            className="chat_input"
            value={message}
            onChange={update}
          />
          <Button type="submit" label="Send" />
        </form>
      </div>
      <div className="chat_users">Chat Users</div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
