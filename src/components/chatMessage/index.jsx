import React from "react";
import "./index.css";
const ChatMessage = ({ message, isMine, time, senderName }) => {
  return (
    <div
      className={` p-0 d-flex  ${
        isMine ? "justify-content-end  " : "justify-content-start"
      }`}
    >
      <div
        className={` m-2 rounded shadow ${
          isMine ? "mine-message-bg text-white" : " sender-message-bg text-dark"
        }`}
      >
        <p style={{ fontSize: 10 }}>
          {!isMine && senderName && <strong>{senderName}</strong>}
        </p>
        <p style={{ fontSize: 11 }}>{message}</p>
        <div className="d-flex justify-content-end"> 
          <p style={{ fontSize: 10 }}>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
