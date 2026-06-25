import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const m = await loadRemoteModule({
        remoteName: 'notifications',
        exposedModule: './mount',
      });

      const mount = m.mount || m.default?.mount;
      this.cleanup = await mount(this.container.nativeElement);
      this.loading = false;
      this.cdr.detectChanges();
    } catch (err: any) {
      this.loading = false;
      this.error = err?.message || 'Unknown error';
      this.cdr.detectChanges();
      console.error('Failed to load remote:', err);
    }
  }

  ngOnDestroy() {
    this.cleanup?.unmount();
  }
}
