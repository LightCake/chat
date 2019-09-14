import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./Chat.css";
import { receiveMessages } from "../../actions/message";
import ChatMessage from "../ChatMessage/ChatMessage";

const Chat = props => {
  const {
    receiveRooms,
    receiveMessage,
    receiveMessages,
    room,
    user,
    messages
  } = props;

  const [message, setMessage] = useState("");

  // Returned object will persist for the full lifetime of the component.
  const ws = useRef(null);

  // References the div at the end of the message history
  const messagesEndRef = useRef(null);

  // Scroll to the div at the bottom of the message history
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Trigger the 'scrollToBottom' function, whenever the 'messages' prop changes
  useEffect(scrollToBottom, [messages]);

  // Equivalent to ComponentDidMount lifecycle method
  useEffect(() => {
    const [_, token] = localStorage.getItem("jwtToken").split(" ");
    const URI = encodeURI(`ws://localhost:5000/?token=${token}`);
    ws.current = new WebSocket(URI);

    ws.current.onmessage = message => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case "receive-rooms":
          receiveRooms(message.rooms);
          break;
        case "receive-message":
          receiveMessage(data.message);
          break;
        case "receive-messages":
          receiveMessages(data.messages);
          break;
      }
    };
    console.log("Component Did Mount");
    // Equivalent to ComponentWillUnmount lifecycle method
    // return () => {
    //   console.log("Leaving");
    //   const data = {
    //     action: "leave-room",
    //     room: room.current,
    //     user
    //   };
    //   ws.send(JSON.stringify(data));
    // };
  }, []);

  const update = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = { type: "send-message", message, room: room.current, user };
    ws.current.send(JSON.stringify(data));
    setMessage("");
  };

  const joinRoom = () => {
    const temp = {
      type: "join-room",
      room: { name: "Info" },
      user: { name: "maria" }
    };
    ws.current.send(JSON.stringify(temp));
  };

  return (
    <div className="chat">
      <div className="chat_rooms">Chat Rooms</div>
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
        <button onClick={joinRoom}>Join</button>
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
