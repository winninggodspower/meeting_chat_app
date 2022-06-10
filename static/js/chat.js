// import constructMessage from './ConstructMessage.js'

function HandleNewMessage(currentUser, message){
  
  const message_card = constructMessage(currentUser, message)

  $('.comment-card-container').before(message_card);
  addReplyEventListener()
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
