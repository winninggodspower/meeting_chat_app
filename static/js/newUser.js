
// ```
// The function HandleNewUser adds the new user to the active user section of the ui/page
// ```
function HandleNewUser(data) {
    const users = $('.users').text().split('\n').filter((lt)=>{
        return lt.trim() != ''
    } ).map((lt)=>{
        return lt.trim()
    })


    if (!users.includes(data.username) ) {
        $('#user-list').append(`
        <li class="${data.username} nav-item nav-link link-dark users">
            <div class="position-relative d-inline">
              <span class="active-icon position-absolute translate-middle p-1 border rounded-circle"></span>
              <img class="bi me-2 rounded-circle" src="${data.user_img_url}" width="30" height="30" alt="">
            </div>
            ${data.username}
          </li>
        `)
    }


}


function HandleAllUser(data) {
    data.forEach(user_data => {
        HandleNewUser(user_data)
    });
}

function RemoveUser(data) {
    $(`.${data.username}`).remove()
}