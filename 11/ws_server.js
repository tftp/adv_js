const WebSocket = require("ws");
const wsConnection = new WebSocket.Server({ port: 8080 });

const clients = new Set();

class User {
  constructor(connection) {
    this.connection = connection;
    this._channels = new Set();
    this.name = 'User' + new Date().getTime();
  }

  sendMessage(message) {
    this.connection.send(message);
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

wsConnection.on("connection", ws => {
    const user = new User(ws);
    clients.add(user);

    user.connection.on("message", function(data) {
    let message = JSON.parse(data);

    switch (message.command) {
      case "login":
        if(!message.channel){
          user.sendMessage('Not set channel!');
          return;
        }
        if(user._channels.size >= 2){
          user.sendMessage('You have max number of channels!');
          return;
        }
        user.loginChannel(message.channel);
        if (message.name){
          user.name = message.name;
        };
        clients.forEach( client => {
            if(client.isLoggedIn(message.channel)) {
              client.sendMessage( `[${message.channel}]: ${user.name} is logged in [${message.channel}]`)
            }
        })
        return;
      case "logout":
        if(!message.channel){
          user.sendMessage('Not set channel!');
          return;
        }
        if(user.isLoggedIn(message.channel)) {
          user._channels.delete(message.channel);
          user.sendMessage( `You are logout from channel [${message.channel}]`)
          clients.forEach( client => {
              if(client.isLoggedIn(message.channel)) {
                client.sendMessage( `[${message.channel}]: ${user.name} is logout from [${message.channel}]`)
              }
          })
        }
        return;
      case "sendMessage":
        if(!message.channel){
          user.sendMessage('Not set channel!');
          return;
        }
        if(!user._channels.has(message.channel)){
          user.sendMessage(`You must login to channel [${message.channel}] before send message!`);
          return;
        }
        if(message.message){
          clients.forEach( client => {
              if(client.isLoggedIn(message.channel)) {
                client.sendMessage( `[${message.channel}]:[${user.name}]: ${message.message}`)
              }
          });
        };
        return;
      case "exitChat":
        user.sendMessage('You exit from chat');
        user.connection.close();
        clients.forEach( client => {
            user._channels.forEach((channel) => {
              if(client.isLoggedIn(channel)) {
                client.sendMessage( `[${channel}]: ${user.name} is exit from chat`)
              }
            });
        });
        clients.delete(user);
        return;
      default:
        user.sendMessage(`Unknown command ${message.command}`);
        return;
    }
  });

  user.connection.on("close", function() {
    clients.delete(user);
  });
});
