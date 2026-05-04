import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cards from './Cards';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Cards', () => {
  test('renders cards container with title', () => {
    renderWithRouter(<Cards />);

    expect(screen.getByText('Pick your poison!')).toBeInTheDocument();
  });

  test('renders card items', () => {
    renderWithRouter(<Cards />);

    // Check for the text from CardItem components
    expect(screen.getByText("Don't know what to play? Pick a random deck.")).toBeInTheDocument();
    expect(screen.getByText('Feeling lucky? Generate random effects.')).toBeInTheDocument();

    // Check for labels
    expect(screen.getByText('Decks')).toBeInTheDocument();
    expect(screen.getByText('Random Effects')).toBeInTheDocument();
  });

  test('renders links with correct paths', () => {
    renderWithRouter(<Cards />);

    const deckLink = screen.getByRole('link', { name: /decks/i });
    expect(deckLink).toHaveAttribute('href', '/decks');

    const effectLink = screen.getByRole('link', { name: /random effects/i });
    expect(effectLink).toHaveAttribute('href', '/random-effect');
  });
});