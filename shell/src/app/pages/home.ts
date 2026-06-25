import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h2>Welcome to Team Dashboard</h2>
    <p>This is the Angular shell application (host). Three micro frontends are loaded via Native Federation:</p>
    <ul>
      <li><strong>Activity</strong> — Angular remote (same-framework, same-version)</li>
      <li><strong>Projects</strong> — React remote (cross-framework)</li>
      <li><strong>Notifications</strong> — Angular 18 remote (cross-version)</li>
    </ul>
  `,
})
export class HomePage {}
