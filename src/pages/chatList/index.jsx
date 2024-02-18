import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from '../../components/chatMessage';
import './index.css';
import {
  getDataToLocalStorage, saveDataToLocalStorage,
} from "../../helper/localStorage/index.ts";
import { localKey } from '../../helper/constants/localStorageKey.ts';
const imageurl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
function ChatList() {
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState('');
  const [loggedUser, setLoggedUser] = useState();
  const messagesEndRef = useRef(null);

  useEffect(()=>{
    fetchChats();
  },[])

  const fetchChats = ()=>{
    const data = getDataToLocalStorage(localKey.CHATS);
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    setLoggedUser(loginUser);
    let chatData = [];
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      element["isMine"] = false;
      if(element.senderEmail === loginUser.email){
        element.isMine = true;
      }
      chatData.push(element);
    }
    setMessagesList(chatData);
    scrollToBottom();
  }

  const sendMessage = (e) => {
    e.preventDefault();
    setMessage('');
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    setLoggedUser(loginUser);
    let messageObj = { message: message, senderName: loginUser.name,createdAt: new Date().toLocaleTimeString() ,senderEmail: loggedUser.email }
    let prevChats = getDataToLocalStorage(localKey.CHATS);
    prevChats.push(messageObj);
    saveDataToLocalStorage(localKey.CHATS, prevChats);
    fetchChats();
  }
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);
  return (
    <div className="w-100 d-flex flex-column align-items-center mt-5">
      <div class="card w-75">
        <div class="card-body">
          <div class="card-header text-center">Group chat</div>

          <div style={{ height: 350, overflow: "scroll",}} ref={messagesEndRef}>
            {messagesList.length > 0 ? (
              <>
                {messagesList.map((item) => {
                  console.log("item--->",item)
                  return (
                    <ChatMessage
                      message={item.message}
                      isMine={item.isMine}
                      time={item.createdAt}
                      senderName={item.senderName}
                      senderImage={imageurl}
                    />
                  );
                })}
              </>
            ) : (
              <div className='d-flex justify-content-center align-items-center' style={{ height: 300}} >
                <p>No Chat Avilable </p>
              </div>
            )}
          </div>

          <div class="card-footer col-12 d-flex justify-space-between justify-content-between">
            <div className="col-2 bg-primary rounded text-center">
              <p className='text-white'>{loggedUser && loggedUser.name}</p>
            </div>
            <div className="col-8">
              <form onSubmit={sendMessage} >
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Message here ......"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              </form>
             
            </div>
            <button
              type="button"
              onClick={()=> fetchChats()}
              className="col-1 btn btn-outline bg-secondary text-white"
              style={{ width: 50 }}
            >
              <i class="fas fa-sync-alt fa-rotate-90"></i>
            </button>
            <button
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

export default ChatList
