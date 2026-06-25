import { Component, ViewContainerRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { loadRemoteModule } from '@softarc/native-federation-runtime';

@Component({
  selector: 'app-activity-wrapper',
  template: `
    <ng-container #mfeContainer></ng-container>
    @if (loading) {
      <p>Loading Activity Feed micro frontend...</p>
    }
    @if (error) {
      <p style="color: #dc2626;">Failed to load Activity Feed remote: {{ error }}</p>
    }
  `,
})
export class ActivityWrapperPage implements OnInit {
  @ViewChild('mfeContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  loading = true;
  error = '';

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const m = await loadRemoteModule({
        remoteName: 'activity',
        exposedModule: './ActivityFeed',
      });

      this.container.createComponent(m.ActivityFeedComponent);
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
