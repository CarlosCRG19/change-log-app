import { useContext } from 'react';

import UserContext from './UserContext';

const useAdminUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('`useUserContext` must be used within an `UserContextProvider`.');
  }

  return context;
};

export default useAdminUser;
