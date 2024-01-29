import React from "react";

const ChatMessage = ({ message, isMine, time, senderName, senderImage }) => {
  return (
    <div
      className={`d-flex ${
        isMine ? "justify-content-end" : "justify-content-start"
      } mb-2 mt-2`}
    >
      <div
        className={`p-2 d-flex ${
          isMine ? "bg-primary text-white" : "bg-light"
        }`}
        style={{ borderRadius: "10px" }}
      >
        {senderImage && (
          <img
            src={senderImage}
            alt="Sender"
            className="rounded-circle mr-2"
            style={{ width: "30px", height: "30px",marginRight:10 }}
          />
        )}
        <div className="ml-5">
          <p className="mb-0">{message}</p>

          <small className="text-muted mt-1">
            {senderName && <strong>{senderName}</strong>} {time}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
