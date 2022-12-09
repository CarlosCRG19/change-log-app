import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserContextProvider } from '@/contexts/user';
import { AppRoutes } from '@/routes';

const App = () => (
  <UserContextProvider>
    <Router>
      <AppRoutes />
    </Router>
  </UserContextProvider>

);

export default App;
