window.addEventListener('load', fetchData)
//global declarations
const users = document.getElementById('user')
const posts = document.getElementById('posts')
const header = document.getElementById('postowner')

//fetch to /users and render list of users to the page
function fetchData(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => data.forEach((item) => {
        displayNameTable(item)
    }))
}

//function to display users as a table row
function displayNameTable(obj){
    const userList = document.createElement('td')
    userList.className = 'user'
    userList.textContent = obj.name
    users.appendChild(userList)
    //adding event listener to users as created to fetch dynamically to that users posts and render to the page
    userList.addEventListener('click', () => {
        header.innerHTML = obj.name
        fetch(`https://jsonplaceholder.typicode.com/users/${obj.id}/posts`)
        .then(res => res.json())
        //reset innerHTML to clear so we don't re-append infinitely to bottom of page
        .then(posts.innerHTML = null)
        .then((data) => data.forEach((post) =>{
                renderComments(post)
        }))
    })
}

//function to render comments to page after clicking user
function renderComments(obj){
    let commentHeader = document.createElement('h1')
    let commentBody = document.createElement('h4')
    commentHeader.className = 'header'
    commentBody.className = 'info'
    commentHeader.textContent = obj.title
    commentBody.textContent = obj.body
    posts.appendChild(commentHeader)
    posts.appendChild(commentBody)
}