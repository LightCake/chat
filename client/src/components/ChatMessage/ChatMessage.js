import React from "react";
import PropTypes from "prop-types";
import "./ChatMessage.css";

const ChatMessage = props => {
  // Display date in the correct format
  const displayTime = timestamp => {
    // Transform timestamp to datetime object
    const temp = new Date(timestamp);
    // Get datetime object representing today
    const temp2 = new Date();
    // Get user's browser language
    const userLang = navigator.language || navigator.userLanguage;
    // Get the date of today
    const today = temp2.toLocaleDateString(userLang);
    // Get the date of yesterday
    let yesterday = temp2;
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toLocaleDateString(userLang);
    // Get the time
    const time = temp.toLocaleTimeString(userLang);
    // Get the date
    const date = temp.toLocaleDateString(userLang);
    // If the date is either today's or yesterday's date display the corresponding word, otherwise, display the date
    return `${
      today === date ? "Today" : yesterday === date ? "Yesterday" : date
    }, ${time}`;
  };

  const { text, user, date } = props;
  return (
    <div className="chat_message">
      <div className="chat_message_user">{user}</div>
      <div className="chat_message_text">{text}</div>
      <div className="chat_message_date">{displayTime(date)}</div>
    </div>
  );
};

ChatMessage.propTypes = {};

export default ChatMessage;
