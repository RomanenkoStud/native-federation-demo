import { Component } from '@angular/core';
import { NotificationsComponent } from './components/notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotificationsComponent],
  template: `<app-notifications></app-notifications>`,
})
export class App {}
