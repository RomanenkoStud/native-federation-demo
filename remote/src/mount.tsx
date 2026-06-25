import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import ProjectList from './components/ProjectList';

export function mount(element: HTMLElement): { unmount: () => void } {
  const root: Root = createRoot(element);
  root.render(
    <React.StrictMode>
      <ProjectList />
    </React.StrictMode>
  );
  return { unmount: () => root.unmount() };
}
