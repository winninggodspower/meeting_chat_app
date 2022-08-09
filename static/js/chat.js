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

function removeReplyModal(message_id) {
  // console.log(document.getElementById(`reply-modal-${message_id}`))
  var replyModal = new bootstrap.Modal(document.getElementById(`reply-modal-${message_id}`), {
    keyboard: false
   })
  replyModal.hide() //closing the modal
  $(`reply-modal-${message.message_id}`).modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  $('.modal-backdrop').removeClass('show');
  console.log('removed modal');
}

// add eventlistener to the reply form and delete buttons 
const addReplyAndDelEventListener = ()=> {
  // event listener for reply form
  $('.reply-form').on('submit', (e)=>{
      e.preventDefault()
      submitReply(e)
      console.log(e.target.children.message_id.value);
      removeReplyModal(e.target.children.message_id.value)
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