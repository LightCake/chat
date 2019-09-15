import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./Chat.css";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatRoom from "../ChatRoom/ChatRoom";

const Chat = props => {
  const {
    receiveRooms,
    receiveMessage,
    receiveMessages,
    room,
    user,
    messages
  } = props;

  // Local state contains the message to send
  const [message, setMessage] = useState("");

  // References the WebSocket object
  const ws = useRef(null);

  // References the div at the end of the message history
  const messagesEndRef = useRef(null);

  // Scrolls to the div residint at the bottom of the message history
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Triggers the 'scrollToBottom' function, whenever the 'messages' prop changes
  useEffect(scrollToBottom, [messages]);

  // Triggers every time when the component did mount
  useEffect(() => {
    // Retrieve the JSON webtoken from the local storage
    const [_, token] = localStorage.getItem("jwtToken").split(" ");
    // Create the uniform ressource identifier with the token inside the query
    const URI = encodeURI(`ws://localhost:5000/?token=${token}`);
    // Create a WebSocket object and establish a connection to the server
    ws.current = new WebSocket(URI);

    // WebSocket listens on the message event
    ws.current.onmessage = message => {
      // Converts the string to a javascript object
      const data = JSON.parse(message.data);
      // Evaluates which message type we received
      switch (data.type) {
        case "receive-rooms":
          receiveRooms(data.rooms);
          break;
        case "receive-message":
          receiveMessage(data.message);
          break;
        case "receive-messages":
          receiveMessages(data.messages);
          break;
      }
    };

    // Executes all code inside this function before the page refreshes
    window.onbeforeunload = () => {
      // When the page refreshes, we want to leave the current room
      const data = {
        type: "leave-room",
        room: room.current,
        user
      };
      ws.current.send(JSON.stringify(data));
    };

    // Equivalent to ComponentWillUnmount lifecycle method
    return () => {
      // Leave the current room, when the component will unmount
      const data = {
        type: "leave-room",
        room: room.current,
        user
      };
      ws.current.send(JSON.stringify(data));
    };
  }, []);

  // Update the local message state, whenever input value changes
  const update = event => {
    setMessage(event.target.value);
  };

  // Run the code inside this function, whenever we submit the form
  const handleSubmit = event => {
    // Prevent the form to send an actual post request
    event.preventDefault();
    // Send the message through the websocket connection to the server
    const data = { type: "send-message", message, room: room.current, user };
    ws.current.send(JSON.stringify(data));
    // Clear the input after message was send
    setMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_rooms">
        <div className="chat_rooms_headers">
          <div>Name</div>
          <div>Users</div>
        </div>
        {room.all.map(room => (
          <ChatRoom name={room.name} users={room.users} />
        ))}
      </div>

      <div className="chat_history">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            text={message.text}
            user={message.user}
            date={message.created}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

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

      <div className="chat_users">
        <div>Chat Room</div>
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
