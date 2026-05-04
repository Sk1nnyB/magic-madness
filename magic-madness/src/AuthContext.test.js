import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

// Mock Firebase
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('./utils/firebase');

const mockUser = { uid: '123', email: 'test@example.com' };
const mockProfile = { username: 'testuser', email: 'test@example.com' };

const TestComponent = () => {
  const { user, profile, loading } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? user.email : 'no user'}</div>
      <div data-testid="profile">{profile ? profile.username : 'no profile'}</div>
      <div data-testid="loading">{loading ? 'loading' : 'loaded'}</div>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides initial loading state', () => {
    onAuthStateChanged.mockImplementation(() => jest.fn());

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('loading');
  });

  test('sets user and profile on auth state change', async () => {
    const mockUnsubscribe = jest.fn();
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return mockUnsubscribe;
    });

    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockProfile,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
      expect(screen.getByTestId('profile')).toHaveTextContent('testuser');
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });
  });

  test('handles user logout', async () => {
    const mockUnsubscribe = jest.fn();
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return mockUnsubscribe;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user');
      expect(screen.getByTestId('profile')).toHaveTextContent('no profile');
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });
  });

  test('handles profile fetch error', async () => {
    const mockUnsubscribe = jest.fn();
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return mockUnsubscribe;
    });

    getDoc.mockRejectedValue(new Error('Fetch error'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
      expect(screen.getByTestId('profile')).toHaveTextContent('no profile'); // Should fall back
    });
  });
});