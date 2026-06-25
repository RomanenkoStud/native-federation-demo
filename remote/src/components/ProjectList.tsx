import React from 'react';
const { useState } = React;

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  lastUpdated: string;
}

const MOCK_PROJECTS: Project[] = [
  { id: 1, name: 'Design System v2', status: 'active', lastUpdated: '2 hours ago' },
  { id: 2, name: 'API Gateway Migration', status: 'active', lastUpdated: '5 hours ago' },
  { id: 3, name: 'Mobile App Redesign', status: 'on-hold', lastUpdated: '2 days ago' },
  { id: 4, name: 'CI/CD Pipeline Overhaul', status: 'completed', lastUpdated: '1 week ago' },
];

const STATUS_COLORS: Record<Project['status'], string> = {
  active: '#22c55e',
  completed: '#3b82f6',
  'on-hold': '#eab308',
};

export default function ProjectList() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '1rem' }}>
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>Projects</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {MOCK_PROJECTS.map((project) => (
          <li
            key={project.id}
            onClick={() => setSelected(selected === project.id ? null : project.id)}
            style={{
              padding: '0.75rem 1rem',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              border: `1px solid ${selected === project.id ? '#6366f1' : '#e5e7eb'}`,
              cursor: 'pointer',
              background: selected === project.id ? '#f5f3ff' : '#fff',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{project.name}</strong>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  background: STATUS_COLORS[project.status] + '20',
                  color: STATUS_COLORS[project.status],
                  fontWeight: 600,
                }}
              >
                {project.status}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Updated {project.lastUpdated}
            </div>
            {selected === project.id && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#374151' }}>
                Project details for <strong>{project.name}</strong> would load here.
                This component is served from the React remote at <code>localhost:3001</code>.
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
