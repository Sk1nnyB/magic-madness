import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (component, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe('App', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
  });

  test('renders home page by default', () => {
    renderWithRouter(<App />, ['/']);
    // Assuming Home has some identifiable text
    // Since Home might be simple, just check it renders
  });

  test('renders decks page', () => {
    renderWithRouter(<App />, ['/decks']);
    // Check for elements specific to Decks component
  });

  test('renders random effect page', () => {
    renderWithRouter(<App />, ['/random-effect']);
    expect(screen.getByText('Generate Random Effect:')).toBeInTheDocument();
  });

  // Add more route tests as needed
});