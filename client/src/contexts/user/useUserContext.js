import { useContext } from 'react';

import UserContext from './UserContext';

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('`useUserContext` must be used within an `UserContextProvider`.');
  }

  return context;
};

export default useUserContext;
