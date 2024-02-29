const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Broadcast the received message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ text: message }));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
