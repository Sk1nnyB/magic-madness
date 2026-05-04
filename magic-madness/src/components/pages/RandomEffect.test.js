import React from 'react';
import { render } from '@testing-library/react';
import RandomEffect from './RandomEffect';

describe('RandomEffect', () => {
  test('renders without crashing', () => {
    render(<RandomEffect />);
  });
});