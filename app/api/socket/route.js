import { Server } from 'ws';

let wss = null;

export async function GET(req, res) {
  if (!wss) {
    // If the WebSocket server isn't initialized yet
    const server = res.socket.server;
    wss = new Server({ server });

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'notification') {
          // Broadcast notification to all connected clients (police)
          wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        }
      });
    });
    console.log('WebSocket server is running');
  }

  res.status(200).end();
}
