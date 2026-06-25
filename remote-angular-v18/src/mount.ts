import { bootstrapApplication } from '@angular/platform-browser';
import { NotificationsComponent } from './app/components/notifications';
import { appConfig } from './app/app.config';

export async function mount(element: HTMLElement): Promise<{ unmount: () => void }> {
  const host = document.createElement('app-notifications');
  element.appendChild(host);

  const appRef = await bootstrapApplication(NotificationsComponent, appConfig);

  return {
    unmount() {
      appRef.destroy();
    },
  };
}
