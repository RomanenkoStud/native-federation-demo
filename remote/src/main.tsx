import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectList from './components/ProjectList';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ProjectList />
  </React.StrictMode>
);
