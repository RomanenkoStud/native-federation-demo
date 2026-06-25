import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { loadRemoteModule } from '@softarc/native-federation-runtime';
import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

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
  private reactRoot: Root | null = null;

  async ngOnInit() {
    try {
      const m = await loadRemoteModule({
        remoteName: 'mfe1',
        exposedModule: './ProjectList',
      });

      const ProjectList = m.default || m.ProjectList;
      this.reactRoot = createRoot(this.container.nativeElement);
      this.reactRoot.render(createElement(ProjectList));
      this.loading = false;
    } catch (err: any) {
      this.loading = false;
      this.error = err?.message || 'Unknown error';
      console.error('Failed to load remote:', err);
    }
  }

  ngOnDestroy() {
    this.reactRoot?.unmount();
  }
}
