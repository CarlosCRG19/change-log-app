import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

import { useUserContext } from '@/contexts/user';
import { Content, PrivateHeader } from '@/components';

const PrivateRoute = ({ redirectPath = '/login' }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <PrivateHeader />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

PrivateRoute.propTypes = {
  redirectPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  redirectPath: '/login',
};

export default PrivateRoute;
