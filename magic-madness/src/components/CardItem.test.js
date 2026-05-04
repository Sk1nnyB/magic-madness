import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardItem from './CardItem';

const mockProps = {
  src: 'test-image.jpg',
  text: 'Test card text',
  label: 'Test Label',
  path: '/test-path',
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CardItem', () => {
  test('renders card item with correct props', () => {
    renderWithRouter(<CardItem {...mockProps} />);

    const img = screen.getByAltText('Card Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProps.src);

    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
    expect(screen.getByText(mockProps.label)).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProps.path);
  });

  test('renders as a list item', () => {
    renderWithRouter(<CardItem {...mockProps} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  });
});