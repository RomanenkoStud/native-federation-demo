import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { loadRemoteModule } from '@softarc/native-federation-runtime';

@Component({
  selector: 'app-projects-wrapper',
  template: `
    <div #mfeContainer>
      @if (loading) {
        <p>Loading Projects micro frontend...</p>
      }
      @if (error) {
        <p style="color: #dc2626;">Failed to load Projects remote: {{ error }}</p>
      }
    </div>
  `,
})
export class ProjectsWrapperPage implements OnInit, OnDestroy {
  @ViewChild('mfeContainer', { static: true }) container!: ElementRef;

  loading = true;
  error = '';
  private cleanup: { unmount: () => void } | null = null;

  async ngOnInit() {
    try {
      const m = await loadRemoteModule({
        remoteName: 'mfe1',
        exposedModule: './mount',
      });

      const mount = m.mount || m.default?.mount;
      this.cleanup = mount(this.container.nativeElement);
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
