'use client'; // Required for client-side operations

import { useEffect, useState } from 'react';
import Map from '@/components/map';

const PolicePage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket('wss://crime-radar-websocket.onrender.com');

    // Listen for messages from the WebSocket server
    socket.onmessage = async (event) => {
      let data = event.data;

      // Check if the message is a Blob
      if (data instanceof Blob) {
        data = await data.text(); // Convert Blob to text
      }

      // Parse the data as JSON
      const parsedData = JSON.parse(data);

      // Check if it's a notification message
      if (parsedData.type === 'notification') {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          parsedData,
        ]);
      }
    };

    return () => {
      socket.close(); // Clean up WebSocket connection
    };
  }, []);

  return (
    <div>
      <h1>Police Page</h1>
      <div>
        {notifications.map((notification, index) => (
          <div key={index}>
            <p>{notification.content}</p>
            <p>
              Location: {notification.location.latitude}, {notification.location.longitude}
              <Map latitude = {notification.location.latitude} longitude = {notification.location.longitude} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicePage;
