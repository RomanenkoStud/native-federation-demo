import { Component, computed, signal } from '@angular/core';

interface Notification {
  id: number;
  type: 'mention' | 'review' | 'deploy' | 'alert';
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, type: 'mention', message: 'Alice mentioned you in PR #45', time: '2 min ago', read: false },
  { id: 2, type: 'review', message: 'Your PR #43 was approved by Bob', time: '15 min ago', read: false },
  { id: 3, type: 'deploy', message: 'Deployment to staging succeeded', time: '1 hour ago', read: true },
  { id: 4, type: 'alert', message: 'High memory usage on prod-02', time: '2 hours ago', read: true },
  { id: 5, type: 'review', message: 'Carol left comments on PR #41', time: '3 hours ago', read: true },
];

const TYPE_ICONS: Record<string, string> = {
  mention: '@',
  review: '✓',
  deploy: '↑',
  alert: '!',
};

@Component({
  selector: 'app-notifications',
  standalone: true,
  template: `
    <div style="font-family: system-ui, sans-serif; padding: 1rem">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem">
        <h2 style="margin: 0; font-size: 1.25rem">Notifications</h2>
        <span style="
          background: #f59e0b; color: white;
          padding: 0.15rem 0.5rem; border-radius: 999px;
          font-size: 0.7rem; font-weight: 600
        ">{{ unreadCount() }} unread</span>
      </div>
      <ul style="list-style: none; padding: 0; margin: 0">
        @for (item of notifications(); track item.id) {
          <li [style.background]="item.read ? 'transparent' : '#fffbeb'"
              style="display: flex; gap: 0.75rem; padding: 0.65rem 0.5rem; border-bottom: 1px solid #f3f4f6; border-radius: 4px; margin-bottom: 2px">
            <span style="
              width: 28px; height: 28px; border-radius: 50%;
              background: #f59e0b; color: white;
              display: flex; align-items: center; justify-content: center;
              font-size: 0.75rem; font-weight: 700; flex-shrink: 0
            ">{{ typeIcon(item.type) }}</span>
            <div style="flex: 1">
              <div [style.color]="item.read ? '#6b7280' : '#111827'"
                   [style.fontWeight]="item.read ? '400' : '500'"
                   style="font-size: 0.875rem">{{ item.message }}</div>
              <div style="font-size: 0.75rem; color: #9ca3af; margin-top: 0.15rem">{{ item.time }}</div>
            </div>
          </li>
        }
      </ul>
      <p style="font-size: 0.75rem; color: #9ca3af; margin-top: 0.75rem; text-align: center">
        Angular v18 remote at <code>localhost:3003</code>
      </p>
    </div>
  `,
})
export class NotificationsComponent {
  notifications = signal(MOCK_NOTIFICATIONS);
  unreadCount = computed(() => this.notifications().filter((n) => !n.read).length);

  typeIcon(type: string): string {
    return TYPE_ICONS[type] ?? '•';
  }
}
