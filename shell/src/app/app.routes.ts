import { Routes } from '@angular/router';
import { HomePage } from './pages/home';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'activity',
    loadComponent: () =>
      import('./pages/activity-wrapper').then((m) => m.ActivityWrapperPage),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects-wrapper').then((m) => m.ProjectsWrapperPage),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./pages/notifications-wrapper').then((m) => m.NotificationsWrapperPage),
  },
];
