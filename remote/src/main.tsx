import React from 'react';
import ReactDOMClient from 'react-dom/client';
import ProjectList from './components/ProjectList';

const createRoot = ReactDOMClient.createRoot || (ReactDOMClient as any).default?.createRoot;
const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ProjectList />
  </React.StrictMode>
);
