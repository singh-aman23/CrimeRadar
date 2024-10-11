'use client'; // Required for client-side operations

import { useEffect, useState } from 'react';

const UserPage = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket('ws://localhost:3001');
    setWs(socket);

    return () => {
      socket.close(); // Clean up WebSocket connection
    };
  }, []);

  const notifyPolice = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const message = JSON.stringify({
          type: 'notification',
          content: 'User pressed the button!',
          location: { latitude, longitude },
        });

        // Send message to WebSocket server
        ws.send(message);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={notifyPolice}>Notify Police</button>
    </div>
  );
};

export default UserPage;
