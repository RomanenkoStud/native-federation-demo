import { Component, signal } from '@angular/core';

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 1, user: 'Alice', action: 'pushed to', target: 'feature/auth-flow', time: '5 min ago', avatar: 'A' },
  { id: 2, user: 'Bob', action: 'opened PR #42 on', target: 'Design System v2', time: '20 min ago', avatar: 'B' },
  { id: 3, user: 'Carol', action: 'deployed', target: 'API Gateway (staging)', time: '1 hour ago', avatar: 'C' },
  { id: 4, user: 'Dave', action: 'commented on', target: 'PR #38', time: '2 hours ago', avatar: 'D' },
  { id: 5, user: 'Eve', action: 'merged', target: 'PR #37 into main', time: '3 hours ago', avatar: 'E' },
  { id: 6, user: 'Alice', action: 'closed issue', target: '#129 — Login timeout', time: '5 hours ago', avatar: 'A' },
];

@Component({
  selector: 'app-activity-feed',
  template: `
    <div style="font-family: system-ui, sans-serif; padding: 1rem">
      <h2 style="margin: 0 0 1rem; font-size: 1.25rem">Activity Feed</h2>
      <ul style="list-style: none; padding: 0; margin: 0">
        @for (item of activity(); track item.id) {
          <li style="display: flex; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid #f3f4f6">
            <span style="
              width: 32px; height: 32px; border-radius: 50%;
              background: #6366f1; color: white;
              display: flex; align-items: center; justify-content: center;
              font-size: 0.8rem; font-weight: 600; flex-shrink: 0
            ">{{ item.avatar }}</span>
            <div>
              <div style="font-size: 0.875rem">
                <strong>{{ item.user }}</strong> {{ item.action }}
                <span style="color: #6366f1">{{ item.target }}</span>
              </div>
              <div style="font-size: 0.75rem; color: #9ca3af; margin-top: 0.15rem">
                {{ item.time }}
              </div>
            </div>
          </li>
        }
      </ul>
      <p style="font-size: 0.75rem; color: #9ca3af; margin-top: 0.75rem; text-align: center">
        This component is served from the Angular remote at <code>localhost:3002</code>
      </p>
    </div>
  `,
})
export class ActivityFeedComponent {
  activity = signal(MOCK_ACTIVITY);
}
