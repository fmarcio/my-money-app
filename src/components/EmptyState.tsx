import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function EmptyState() {
  const { theme } = useTheme();

  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '40px', 
      color: theme === 'light' ? '#555' : '#aaa' 
    }}>
      <p>No transactions found yet. Start by adding one in the sidebar!</p>
    </div>
  );
}
