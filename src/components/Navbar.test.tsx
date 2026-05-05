import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './Navbar';
import { vi, describe, it, expect } from 'vitest';

const mockLogout = vi.fn();
vi.mock('../hooks/useLogout', () => ({
  useLogout: () => ({ logout: mockLogout }),
}));

const renderWithContext = (user: any) => {
  const mockContext: AuthContextType = {
    user,
    authIsReady: true,
    dispatch: vi.fn(),
  };

  return render(
    <AuthContext.Provider value={mockContext}>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

describe('Navbar Component', () => {
  it('renders login and signup links when user is not logged in', () => {
    renderWithContext(null);

    expect(screen.getByText('myMoney')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
  });

  it('renders user name and logout button when user is logged in', () => {
    renderWithContext({ displayName: 'Marcio' });

    expect(screen.getByText('Hello, Marcio')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });
});
