import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import {
  CreateProject,
  EditProject,
  Login,
  ProjectDetail,
  ProjectsList,
  Signup,
} from '@/views';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute redirectPath="/projects" />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route index path="*" element={<Navigate to="/login" />} />
    </Route>

    <Route element={<PrivateRoute />}>
      <Route path="/projects" element={<Outlet />}>
        <Route path="" element={<ProjectsList />} />
        <Route path="create" element={<CreateProject />} />
        <Route path=":projectId" element={<ProjectDetail />} />
        <Route path=":projectId/edit" element={<EditProject />} />
      </Route>
      <Route index path="*" element={<Navigate to="/projects" />} />
    </Route>
  </Routes>
);

export default AppRoutes;
