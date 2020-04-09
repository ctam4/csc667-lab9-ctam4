const WebSocket = require('ws');

const options = {
  port: 4000,
};

const wss = new WebSocket.Server(options);

const notes = [];

// broadcast function
const broadcastMessage = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      // if currently active
      client.send(JSON.stringify(message)); // send to client from server
    }
  });
};
const updateUserCount = () => {
  broadcastMessage({
    type: 'UPDATE_USER_COUNT',
    count: wss.clients.size, // number of ws clients
  })
};
const broadcastNewNote = (newNote) => {
  if (newNote) {
    notes.unshift(newNote); // not add empty note
  }
  broadcastMessage({
    type: 'UPDATE_MESSAGES',
    notes,
  })
};

// event 1 connection
wss.on("connection", (ws) => { // ws represents a single connection to a single tab
  // when someone connects, this will be called
  // ws connection stays open the entire time you are on the page
  console.log('Someone has connected');
  updateUserCount();
  broadcastNewNote();

  // event 2 message
  ws.on('message', (message) => {
    console.log(message); // message from client
    const messageObject = JSON.parse(message);
    switch (messageObject.type) {
      case 'SEND_MESSAGE':
        broadcastNewNote(messageObject.newNote);
        break;
      default:
        console.log('Message type not supported');
    }
  });

  // event 3 close
  ws.on('close', () => {
    console.log('Client has disconnected');
    updateUserCount();
  });

  // event 4 client crashed
  ws.on('error', (e) => {
    console.log(e);
  });
});
