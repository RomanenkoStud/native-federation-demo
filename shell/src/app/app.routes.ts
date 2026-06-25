import { Routes } from '@angular/router';
import { HomePage } from './pages/home';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects-wrapper').then((m) => m.ProjectsWrapperPage),
  },
];
