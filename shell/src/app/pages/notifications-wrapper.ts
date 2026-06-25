import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { loadRemoteModule } from '@softarc/native-federation-runtime';

@Component({
  selector: 'app-notifications-wrapper',
  template: `
    <div #mfeContainer>
      @if (loading) {
        <p>Loading Notifications micro frontend...</p>
      }
      @if (error) {
        <p style="color: #dc2626;">Failed to load Notifications remote: {{ error }}</p>
      }
    </div>
  `,
})
export class NotificationsWrapperPage implements OnInit, OnDestroy {
  @ViewChild('mfeContainer', { static: true }) container!: ElementRef;

  loading = true;
  error = '';
  private cleanup: { unmount: () => void } | null = null;

  async ngOnInit() {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:3003/remoteEntry.json',
        exposedModule: './mount',
      });

      const mount = m.mount || m.default?.mount;
      this.cleanup = await mount(this.container.nativeElement);
      this.loading = false;
    } catch (err: any) {
      this.loading = false;
      this.error = err?.message || 'Unknown error';
      console.error('Failed to load remote:', err);
    }
  }

  ngOnDestroy() {
    this.cleanup?.unmount();
  }
}
