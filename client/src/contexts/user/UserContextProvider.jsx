import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import UserContext from './UserContext';

import { useClient } from '@/hooks';

const UserContextProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  const client = useClient();

  const value = useMemo(() => ({
    user, setUser,
  }), [user]);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem('cla-token')) {
        const response = await client.auth.me();

        setUser(response.user);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  initialUser: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
  }),
};

UserContextProvider.defaultProps = {
  initialUser: null,
};

export default UserContextProvider;
