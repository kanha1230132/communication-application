import React from 'react'
import ChatMessage from '../../components/chatMessage';

function ChatList() {
  const imageurl = 'https://images.unsplash.com/photo-1533167649158-6d508895b680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BsYXNofGVufDB8fDB8fHww'
  return (
    <div className="w-100 d-flex flex-column align-items-center mt-5">
      <div class="card w-75">
        <div class="card-body">
          <div class="card-header text-center">Group chat</div>

          <div class="" style={{height:350, overflow:'scroll',}}>
          <ChatMessage
        message="Hi! How are you?"
        isMine={false}
        time="12:35 PM"
        senderName="John Doe"
        senderImage={imageurl}
      />
          <ChatMessage
        message="Hello there!"
        isMine={true}
        time="12:30 PM"
        senderName="You"
        senderImage={imageurl}
      />
      <ChatMessage
        message="Hi! How are you?"
        isMine={false}
        time="12:35 PM"
        senderName="John Doe"
        senderImage={imageurl}
      />
          <ChatMessage
        message="Hello there!"
        isMine={true}
        time="12:30 PM"
        senderName="You"
        senderImage={imageurl}
      /><ChatMessage
      message="Hi! How are you?"
      isMine={false}
      time="12:35 PM"
      senderName="John Doe"
      senderImage={imageurl}
    />
        <ChatMessage
      message="Hello there!"
      isMine={true}
      time="12:30 PM"
      senderName="You"
      senderImage={imageurl}
    />
          </div>

          <div class="card-footer col-12 d-flex justify-space-between justify-content-between">
            <div className="col-2 bg-primary rounded text-center align-middle">kanahiya</div>
            <div className="col-7">
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Message here ......"
              />
            </div>
            <button
              type="button"
              className="col-1 btn btn-outline bg-secondary text-white"
            >
              Send
            </button>
            <button
              type="button"
              className="col-1 btn btn-outline bg-secondary text-white"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList
