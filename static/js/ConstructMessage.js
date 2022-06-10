function constructMessage(currentUser, message){
    reply = message.reply === 'True'? true : false
    let user_display = ( currentUser === message.author ? 'initial' : 'none' )
    let none_user_display = ( currentUser === message.author ? 'none' : 'initial' )

    if(!reply){
       
        return `
        <div class="card-container p-3 row rounded rounded-3 mx-3p mb-3" style="background-color: hsl(0, 0%, 100%);">
        <div
          class="votes-container col-12 col-sm-2 order-1 order-sm-0 mt-2 mt-sm-0 d-flex justify-content-center align-items-start">
          <div class="votes d-flex flex-sm-column justify-content-between p-2 p-sm-3 my-2 rounded rounded-3"
            style="background-color: hsl(223, 19%, 93%);">
            <span class="upvote me-4 mx-sm-0"><svg class="bi" width="11" height="11">
                <use xlink:href='#plus'></use>
              </svg></span>
            <span class="vote me-4 mx-sm-0">${message.votes}</span>
            <span class="downvote me-0 mx-sm-0"><svg class="bi" width="11" height="3">
                <use xlink:href='#minus'></use>
              </svg></span>
          </div>
          <div class="d-sm-none align-self-center">
            <span class="reply me-2 cursor-pointer d-${none_user_display}" data-bs-toggle="modal" data-bs-target="#reply-modal-${message.message_id}" role="button"><svg class="bi" width="14" height="13">
                <use xlink:href='#reply'></use>
              </svg> reply</span>
            <span class="delete me-2 cursor-pointer d-${user_display}" data-bs-toggle="modal" data-bs-target="#modal-${message.message_id}" role="button"><svg
                class="bi" width="12" height="14">
                <use xlink:href='#delete'></use>
              </svg> delete</span>
            <a href="/edit_message/${message.message_id}" class="edit me-2 cursor-pointer text-decoration-none d-${user_display}" role="button"><svg class="bi" width="14" height="14">
                <use xlink:href='#edit'></use>
              </svg> edit</span>
          </div>

          <!-- Delete Modal -->
          <div class="modal fade " id="modal-${message.message_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <h5 class="modal-title" id="exampleModalLabel">Delete comment</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body border-0 pt-0 text-start">
                  Are you sure you want to delete this comment?
                  This will remove the comment and cant'n be undone.
                </div>
                <div class="modal-footer border-0 pt-0 justify-content-between">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO, CANCEL</button>
                  <a href="#" type="button" class="btn delete-btn text-white">YES, DELETE</a>
                </div>
              </div>
            </div>
          </div>
        </div>

            <!-- Modal Reply -->
            <div class="modal fade " id="reply-modal-${message.message_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header border-0">
                    <h5 class="modal-title" id="exampleModalLabel">Reply Comment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form class="form reply-form" method="post">
                    <input value="${message.message_id}" name="message_id" hidden>
                    <input value="${message.author}" name="to" hidden>
                    <div class="modal-body border-0 pt-0 text-start">
                      <textarea name="" id="" class="form-control" required></textarea>
                    </div>
                    <div class="modal-footer border-0 pt-0 justify-content-between">
                      <input type="submit" onsubmit="submitReply(e);" value="REPLY" class="reply-btn btn submit-btn text-white">
                    </div>
                  </form>
                </div>
              </div>
            </div>

        <div class="col">
          <div class="post-head d-flex justify-content-between mb-3">
            <div>
              <img class="rounded-circle" src="${message.user_img_url}" width="35px" alt="profile image"
                style="aspect-ratio: 1/1;">
              <span class="username ms-1">${message.author}</span>
              ${ currentUser === message.author ?'<span class="you-icon ms-1 p-1 rounded text-white">you</span>':''}
              <span class="date-posted ms-1 opacity-50">${message.timestamp}</span>
            </div>
            <div class="d-none d-sm-block">
              <span class="reply me-2 cursor-pointer d-${none_user_display}" data-bs-toggle="modal" data-bs-target="#reply-modal-${message.message_id}" role="button"><svg class="bi" width="14" height="13">
                <use xlink:href='#reply'></use>
                </svg> reply</span>
              <span class="delete me-2 cursor-pointer d-${user_display}" data-bs-toggle="modal" data-bs-target="#modal-${message.message_id}"
                  role="button"><svg class="bi" width="12" height="14">
                    <use xlink:href='#delete'></use>
                  </svg> delete</span>
              <a href="/edit_message/${message.message_id}" class="edit me-2 cursor-pointer text-decoration-none d-${user_display}" role="button"><svg class="bi" width="14" height="14">
                    <use xlink:href='#edit'></use>
                  </svg> edit</a>
            </div>

          </div>
          <div class="post text-start">
            ${message.content}
          </div>
        </div>
      </div>
        `

    }else{
      return `
      <div class="reply-card-container border-start border-3 me-1">
        <div class="card-container p-3 row rounded rounded-3 mx-3p mb-3" style="background-color: hsl(0, 0%, 100%);">
          <div
            class="votes-container col-12 col-sm-2 order-1 order-sm-0 mt-2 mt-sm-0 d-flex justify-content-center align-items-start">
            <div class="votes d-flex flex-sm-column justify-content-between p-2 p-sm-3 my-2 rounded rounded-3 "
              style="background-color: hsl(223, 19%, 93%);">
              <span class="upvote me-4 mx-sm-0"><svg class="bi" width="11" height="11">
                  <use xlink:href='#plus'></use>
                </svg></span>
              <span class="vote me-4 mx-sm-0">5</span>
              <span class="downvote me-0 mx-sm-0"><svg class="bi" width="11" height="3">
                  <use xlink:href='#minus'></use>
                </svg></span>
            </div>
            <div class="d-sm-none align-self-center">
            <span class="reply me-2 cursor-pointer d-${none_user_display}" data-bs-toggle="modal" data-bs-target="#reply-modal-${message.message_id}" role="button"><svg class="bi" width="14" height="13">
                <use xlink:href='#reply'></use>
              </svg> reply</span>
            <span class="delete me-2 cursor-pointer d-${user_display}" data-bs-toggle="modal" data-bs-target="#modal-${message.message_id}" role="button"><svg
                class="bi" width="12" height="14">
                <use xlink:href='#delete'></use>
              </svg> delete</span>
            <a href="/edit_message/${message.message_id}" class="edit me-2 cursor-pointer text-decoration-none d-${user_display}" role="button"><svg class="bi" width="14" height="14">
                <use xlink:href='#edit'></use>
              </svg> edit</a>
          </div>
          </div>
          <div class="col">
            <div class="post-head d-flex justify-content-between mb-3">
              <div>
                <img class="rounded-circle" src="${message.user_img_url}" width="35px"
                  alt="profile image" style="aspect-ratio: 1/1;">
                <span class="username ms-1">${message.author}</span>
                ${ currentUser === message.author ?'<span class="you-icon ms-1 p-1 rounded text-white">you</span>':''}
                <span class="date-posted ms-1 opacity-50">${message.timestamp}</span>
              </div>
              <div class="d-none d-sm-block">
            <span class="reply me-2 cursor-pointer d-${none_user_display}" data-bs-toggle="modal" data-bs-target="#reply-modal-${message.message_id}" role="button"><svg class="bi" width="14" height="13">
              <use xlink:href='#reply'></use>
              </svg> reply</span>
              <span class="delete me-2 cursor-pointer d-${user_display}" data-bs-toggle="modal" data-bs-target="#modal-${message.message_id}"
                role="button"><svg class="bi" width="12" height="14">
                  <use xlink:href='#delete'></use>
                </svg> delete</span>
              <a href="/edit_message/${message.message_id}" class="edit me-2 cursor-pointer text-decoration-none d-${user_display}" role="button"><svg class="bi" width="14" height="14">
                  <use xlink:href='#edit'></use>
                </svg> edit</a>
            </div>
            </div>
            <div class="post text-start">
              <span class="reply-focus">@${message.to}</span>
              ${message.content}
            </div>
          </div>
        </div>

        <!-- Modal Reply -->
        <div class="modal fade " id="reply-modal-${message.message_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title" id="exampleModalLabel">Reply Comment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form class="form reply-form" method="post">
                <input value="${message.message_id}" name="message_id" hidden>
                <input value="${message.author}" name="to" hidden>
                <div class="modal-body border-0 pt-0 text-start">
                  <textarea name="" id="" class="form-control" required></textarea>
                </div>
                <div class="modal-footer border-0 pt-0 justify-content-between">
                  <input type="submit" onsubmit="submitReply(e);" value="REPLY" class="reply-btn btn submit-btn text-white">
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Delete Modal -->
        <div class="modal fade " id="modal-${message.message_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title" id="exampleModalLabel">Delete comment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body border-0 pt-0 text-start">
                Are you sure you want to delete this comment?
                This will remove the comment and cant'n be undone.
              </div>
              <div class="modal-footer border-0 pt-0 justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO, CANCEL</button>
                <a href="#" type="button" class="btn delete-btn text-white">YES, DELETE</a>
              </div>
            </div>
          </div>
        </div>

      </div>`
    }
}

