import React, { useEffect, useState } from "react";
import ChatMessage from "../../components/chatMessage/index.jsx";
import "./index.css";
import { IChats, IUsers } from "../../interface/index.ts";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";

function ChatList() {
  const { localKey, getDataToLocalStorage, saveDataToLocalStorage } =
    AllFilesImporter();
  const [messagesList, setMessagesList] = useState<IChats[]>();
  const [message, setMessage] = useState<string>("");
  const [loggedUser, setLoggedUser] = useState<IUsers>();

  useEffect(() => {
    fetchChats();
  }, []);

  // Function to fetch all chats
  const fetchChats = () => {
    const data: IChats[] = getDataToLocalStorage(localKey.CHATS);
    const loginUser: IUsers = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    setLoggedUser(loginUser);
    let chatData: IChats[] = [];
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      element["isMine"] = false;
      if (element.senderEmail === loginUser.email) {
        element.isMine = true;
      }
      chatData.push(element);
    }
    setMessagesList(chatData);
  };

  // Function to send message
  const sendMessage = () => {
    if(message === ""){
      return;
    }
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    setLoggedUser(loginUser);
    let messageObj = {
      message: message,
      senderName: loginUser.name,
      createdAt: new Date().toLocaleTimeString(),
      senderEmail: loginUser.email,
    };
    let prevChats = getDataToLocalStorage(localKey.CHATS);
    prevChats.push(messageObj);
    saveDataToLocalStorage(localKey.CHATS, prevChats);
    setMessage("");
    fetchChats();
  };
  return (
    <div className="w-100 d-flex flex-column align-items-center mt-5">
      <div className="card w-75">
        <div className="card-body">
          <div className="card-header text-center">Group chat</div>

          <div style={{ height: 350, overflow: "scroll" }}>
            {messagesList && messagesList.length > 0 ? (
              <>
                {messagesList.map((item) => {
                  return (
                    <ChatMessage
                      message={item.message}
                      isMine={item.isMine}
                      time={item.createdAt}
                      senderName={item.senderName}
                    />
                  );
                })}
              </>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: 300 }}
              >
                <p>No Chat Avilable </p>
              </div>
            )}
          </div>

          <div className="card-footer col-12 d-flex justify-space-between justify-content-between">
            <div className="col-2 bg-secondary rounded text-center d-flex align-items-center justify-content-center">
              <p className="text-white">{loggedUser && loggedUser.name}</p>
            </div>
            <div className="col-8">
              <form>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Message here ......"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </form>
            </div>
            <button
              type="button"
              onClick={() => fetchChats()}
              className="col-1 btn btn-outline bg-secondary text-white"
              style={{ width: 50 }}
            >
              <i className="fas fa-sync-alt fa-rotate-90"></i>
            </button>
            <button
            onClick={() => sendMessage()}
              type="submit"
              className="col-1 btn btn-outline bg-secondary text-white"
              style={{ width: 50 }}
            >
              <i className="fa fa-paper-plane icon-space" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
