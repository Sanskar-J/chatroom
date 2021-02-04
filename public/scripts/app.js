//dom queries
const chatList=document.querySelector('.chat-list');
const newChatForm=document.querySelector('.new-chat');
const newNameForm=document.querySelector('.new-name');
const updateMsg=document.querySelector('.update-mssg');
const rooms=document.querySelector('.chat-rooms');
//add new chat
newChatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message=newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(()=>newChatForm.reset())
    .catch(err=> console.log(err));

});

// update username
newNameForm.addEventListener('submit',e=>{
    e.preventDefault();
    // upddate name via chatroom class
    const newName=newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();
    //show then hide the updat message
    updateMsg.innerText=`Your name was updated to ${newName}`;
    setTimeout(()=>updateMsg.innerText='',2000);

});
//update the chatroom

rooms.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat=>chatUI.render(chat));
    }
});
//check loc stor for name
const username=localStorage.username ? localStorage.username : 'anonymous';


// class instances
const chatUI=new ChatUI(chatList);
const chatroom=new Chatroom('general',username);
chatroom.getChats((data)=>{
    chatUI.render(data);
});

