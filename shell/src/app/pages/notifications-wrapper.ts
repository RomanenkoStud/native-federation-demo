import { Component, ViewContainerRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { loadRemoteModule } from '@softarc/native-federation-runtime';

@Component({
  selector: 'app-notifications-wrapper',
  template: `
    <ng-container #mfeContainer></ng-container>
    @if (loading) {
      <p>Loading Notifications micro frontend...</p>
    }
    @if (error) {
      <p style="color: #dc2626;">Failed to load Notifications remote: {{ error }}</p>
    }
  `,
})
export class NotificationsWrapperPage implements OnInit {
  @ViewChild('mfeContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  loading = true;
  error = '';

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const m = await loadRemoteModule({
        remoteName: 'notifications',
        exposedModule: './Notifications',
      });

      this.container.createComponent(m.NotificationsComponent);
      this.loading = false;
      this.cdr.detectChanges();
    } catch (err: any) {
      this.loading = false;
      this.error = err?.message || 'Unknown error';
      this.cdr.detectChanges();
      console.error('Failed to load remote:', err);
    }
  }
}
