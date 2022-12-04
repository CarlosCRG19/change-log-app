import React, { useEffect, useState } from 'react';

import { useClient } from '@/hooks';

import './App.css';

const App = () => {
  const [message, setMessage] = useState('Hello from the front-end side!');

  const client = useClient();

  useEffect(() => {
    const getMessage = async () => {
      const { data: newMessage } = await client.getHelloWorld();

      setMessage(newMessage);
    };

    getMessage();
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default App;
