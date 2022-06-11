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

function HandleVoteMessage(data) {
  if(data.status === 'fail'){
    alert('ERROR: you vote has already been added')
    return // stoping function if the user has already voted
  } 
    
  let clickedElement = $(`span#${data.vote_type}.${data.vote_type}[data-message-id="${data.message_id}"]`)
  if (data.vote_type == 'upvote') {
    clickedElement.next().html(data.vote_count)
  } else {
    clickedElement.prev().html(data.vote_count);
  }
}

// add eventlistener to the reply form and delete buttons 
const addReplyAndDelEventListener = ()=> {
  // event listener for reply form
  $('.reply-form').on('submit', (e)=>{
      e.preventDefault()
      submitReply(e)
    })
  
  // event listener for delete button
  $('.delete-btn').click((e)=>{
    e.preventDefault();
    deleteMessage(e.target);
  })

  // event listener for the voting system
  $('.upvote, .downvote').click((e)=>{
    addVote(e.currentTarget);
  })
  console.log('added event listener');
}

addReplyAndDelEventListener()