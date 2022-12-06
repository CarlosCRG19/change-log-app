import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Content, Header } from '@/components';
import { CreateProject, ProjectsList } from '@/views';

const App = () => (
  <Router>
    <Header />
    <Content>
      <Routes>
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/create" element={<CreateProject />} />
      </Routes>
    </Content>
  </Router>
);

export default App;
