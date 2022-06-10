// import constructMessage from './ConstructMessage.js'

function HandleNewMessage(currentUser, message){
  
  const message_card = constructMessage(currentUser, message)

  $('.comment-card-container').before(message_card);
  addReplyAndDelEventListener()
}

function HandlePreviousMessages(currentUser, messages){
  this.currentUser = currentUser;
  this.currentMessageNum = 0;
  this.messages = messages

  this.addChat = ()=>{
    if (this.currentMessageNum <= this.messages.length) {
      HandleNewMessage(this.currentUser, this.messages[this.currentMessageNum])
      scrollTo(0, document.body.scrollHeight)
      this.currentMessageNum ++
      setTimeout(()=>{
        this.addChat();
      }, 200)
    }
  }

  this.addChat()
}

function  HandleDeleteMessage(message_id) {
  // alert('message deleted ' + message_id)
  $('.container-' + message_id).remove()
}

// add eventlistener to the reply form and delete buttons 
const addReplyAndDelEventListener = ()=> {
  $('.reply-form').on('submit', (e)=>{
      e.preventDefault()
      submitReply(e)
    })
  $('.delete-btn').click((e)=>{
    e.preventDefault();
    deleteMessage(e.target);
  })
  console.log('added event listener');
}

addReplyAndDelEventListener()