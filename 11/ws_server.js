const WebSocket = require("ws");
const wsConnection = new WebSocket.Server({ port: 8080 });

const clients = new Set();

class User {
  constructor(connection) {
    this.connection = connection;
    this._channels = new Set();
    this.name = 'User' + new Date().getTime();
  }

  loginChannel(channelName) {
    this._channels.add (channelName);
  }

  logoutChannel(channelName) {
    this._channels.delete (channelName);
  }

  isLoggedIn(channelName) {
    return this._channels.has(channelName);
  }
}

// function renderAnswer(message){
//   answer = ;
//   answer.push(message);
//   return answer;
// }

wsConnection.on("connection", ws => {
  const user = new User(ws);
  clients.add(user);

  user.connection.on("message", function(data) {
//    const message = JSON.parse(data);             //такая конструкция не работает
    let message = JSON.parse(JSON.stringify(data)); //data имеют вид строки socket.send('{"command" : "login"}')
    message = JSON.parse(message);

    switch (message.command) {
      case "login":
        if(!message.channel){
          user.connection.send('Not set channel!');
          return;
        }
        if(user._channels.size >= 2){
          user.connection.send('You have max number of channels!');
          return;
        }
        user.loginChannel(message.channel);
        if (message.name){
          user.name = message.name;
        };
        clients.forEach( client => {
            if(client.isLoggedIn(message.channel)) {
              client.connection.send( `[${message.channel}]: ${user.name} is logged in [${message.channel}]`)
            }
        })
        return;
      case "logout":
        if(!message.channel){
          user.connection.send('Not set channel!');
          return;
        }
        if(user.isLoggedIn(message.channel)) {
          user._channels.delete(message.channel);
          user.connection.send( `You are logout from channel [${message.channel}]`)
          clients.forEach( client => {
              if(client.isLoggedIn(message.channel)) {
                client.connection.send( `[${message.channel}]: ${user.name} is logout from [${message.channel}]`)
              }
          })
        }
        return;
      case "sendMessage":
        if(!message.channel){
          user.connection.send('Not set channel!');
          return;
        }
        if(!user._channels.has(message.channel)){
          user.connection.send(`You must login to channel [${message.channel}] before send message!`);
          return;
        }
        if(message.message){
          clients.forEach( client => {
              if(client.isLoggedIn(message.channel)) {
                client.connection.send( `[${message.channel}]:[${user.name}]: ${message.message}`)
              }
          });
        };
        return;
      case "exitChat":
        user.connection.send('You exit from chat');
        user.connection.close();
        clients.forEach( client => {
            user._channels.forEach((channel) => {
              if(client.isLoggedIn(channel)) {
                client.connection.send( `[${channel}]: ${user.name} is exit from chat`)
              }
            });
        });
        clients.delete(user);
        return;
      default:
        user.connection.send(`Unknown command ${message.command}`);
        return;
    }
  });

  user.connection.on("close", function() {
    clients.delete(user);
  });

});
