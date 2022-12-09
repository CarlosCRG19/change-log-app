import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserContextProvider } from '@/contexts/user';
import { AppRoutes } from '@/routes';

const App = () => {
  const initialUser = localStorage.getItem('cla-user');

  return (
    <UserContextProvider initialUser={initialUser}>
      <Router>
        <AppRoutes />
      </Router>
    </UserContextProvider>

  );
};

export default App;
