import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Header } from './index';

describe('Header component', () => {
  test('renders the header with a button', () => {
    render(<Header handleOpenSidebar={jest.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls handleOpenSidebar when button is clicked', () => {
    const mockHandleOpenSidebar = jest.fn();
    render(<Header handleOpenSidebar={mockHandleOpenSidebar} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockHandleOpenSidebar).toHaveBeenCalledTimes(1);
  });
});
