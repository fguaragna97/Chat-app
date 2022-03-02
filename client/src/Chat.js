import React, { useState } from "react";

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");

  // here we create a function to the send the message information to socket io
  const sendMessage = async () => {
    // we check if the field is empty or not
    if (currentMessage !== "") {
      // we send this object with all the information
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // with this you can send the information to the backend
      await socket.emit("send_message", messageData);
    }
  };

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        ></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
