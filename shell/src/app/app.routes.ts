import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { ProjectsWrapperPage } from './pages/projects-wrapper';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'projects', component: ProjectsWrapperPage },
];
