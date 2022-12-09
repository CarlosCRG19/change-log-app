import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

import { useUserContext } from '@/contexts/user';
import { Content, PublicHeader } from '@/components';

const PublicRoute = ({ redirectPath }) => {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <PublicHeader />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

PublicRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
};

export default PublicRoute;
