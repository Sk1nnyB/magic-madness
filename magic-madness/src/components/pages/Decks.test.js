import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Decks from './Decks';
import { collection, addDoc, query, getDocs, deleteDoc } from 'firebase/firestore';

// Mock Firebase
jest.mock('firebase/firestore');
jest.mock('./AuthContext', () => ({
  useAuth: () => ({
    user: { email: 'test@example.com' },
    profile: { username: 'testuser' },
    loading: false,
  }),
}));

const mockDecks = [
  { id: '1', commander: 'Test Commander', powerLevel: 5, owner: 'testuser' },
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Decks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getDocs.mockResolvedValue({
      forEach: (callback) => mockDecks.forEach((deck) => callback({ id: deck.id, data: () => deck })),
    });
  });

  test('renders decks component', async () => {
    renderWithRouter(<Decks />);

    await waitFor(() => {
      expect(screen.getByText('Test Commander')).toBeInTheDocument();
    });
  });

  test('fetches decks on mount', async () => {
    renderWithRouter(<Decks />);

    await waitFor(() => {
      expect(getDocs).toHaveBeenCalled();
    });
  });

  test('submits new deck', async () => {
    addDoc.mockResolvedValue({ id: 'new-id' });

    renderWithRouter(<Decks />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/commander/i), { target: { value: 'New Commander' } });
    fireEvent.change(screen.getByLabelText(/power level/i), { target: { value: '7' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          commander: 'New Commander',
          powerLevel: 7,
          owner: 'testuser',
        })
      );
    });
  });

  test('shows error when not logged in', async () => {
    // Mock no user
    jest.doMock('./AuthContext', () => ({
      useAuth: () => ({ user: null, profile: null, loading: false }),
    }));

    renderWithRouter(<Decks />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/you must be signed in/i)).toBeInTheDocument();
  });

  // Add more tests for filtering, sorting, etc.
});