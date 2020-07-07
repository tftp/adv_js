let socket = new WebSocket("ws://localhost:8080");

const inputSend = document.querySelector('#inputSend');
const buttonSend = document.querySelector('#buttonSend');
const inputChannel = document.querySelector('#inputChannel');
const buttonAddChannel = document.querySelector('#addChannel');
const buttonRemoveChannel = document.querySelector('#removeChannel');
const inputNameUser = document.querySelector('#nameUser');
const buttonExitChat = document.querySelector('#exitChat');

buttonSend.addEventListener('click', sendCommand);
buttonAddChannel.addEventListener('click', addChannel);
buttonRemoveChannel.addEventListener('click', removeChannel);
buttonExitChat.addEventListener('click', exitChat);

function addMessage(message){
  let textarea = document.querySelector('#textarea');
  textarea.value = `${message}\n` + textarea.value
};

function addChannel(){
  let channel = inputChannel.value;
  let name = inputNameUser.value.trim();
  let string = {
    command: "login",
    channel: channel
  };

  if (name.length > 0)
    string = {
      command: "login",
      channel: channel,
      name:   name
    };
  socket.send(JSON.stringify(string));
};

function removeChannel(){
  let channel = inputChannel.value
  let string = {
    command: "logout",
    channel: channel
  };
  socket.send(JSON.stringify(string));
};

function sendCommand(){
  let channel = inputChannel.value;
  let message = inputSend.value;
  let string = {
    command: "sendMessage",
    channel: channel,
    message: message,
  };
  inputSend.value = '';
  socket.send(JSON.stringify(string));
};

function exitChat(){
  let string = {
    command: "exitChat",
  };
  socket.send(JSON.stringify(string));
};

socket.onopen = event => {
  console.log("Connection established", event);
  addMessage('Connection established');
};

socket.onmessage = event => {
  console.log("Message received: ", event.data);
  addMessage(event.data);
};

socket.onclose = event => {
  if (event.wasClean) {
    console.log("Closed correct", event.code);
    addMessage(`Chat is closed  ${event.code}`);
  } else {
    console.log("Closed wrong", event.code);
    addMessage(`Chat closed wrong ${event.code}`);
  }
};
