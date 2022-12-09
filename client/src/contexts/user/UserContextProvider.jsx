import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({
    user, setUser,
  }), [user]);

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
