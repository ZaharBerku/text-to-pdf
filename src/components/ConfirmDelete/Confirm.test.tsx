import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmDelete } from './index';

jest.mock('@components/index', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick, className }: any) => (
    <button className={className} onClick={onClick}>{children}</button>
  ),
}));

describe('ConfirmDelete Component', () => {
  const mockOnClose = jest.fn();
  const mockHandleConfirmDelete = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockHandleConfirmDelete.mockClear();
  });

  test('renders the ConfirmDelete modal when open is true', () => {
    render(
      <ConfirmDelete
        open={true}
        onClose={mockOnClose}
        handleConfirmDelete={mockHandleConfirmDelete}
      />
    );

    expect(screen.getByText('Ви впевнені, що хочете видалити?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ні/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Так/i })).toBeInTheDocument();
  });

  test('does not render the ConfirmDelete modal when open is false', () => {
    render(
      <ConfirmDelete
        open={false}
        onClose={mockOnClose}
        handleConfirmDelete={mockHandleConfirmDelete}
      />
    );

    expect(screen.queryByText('Ви впевнені, що хочете видалити?')).not.toBeInTheDocument();
  });

  test('calls onClose when the "Ні" button is clicked', () => {
    render(
      <ConfirmDelete
        open={true}
        onClose={mockOnClose}
        handleConfirmDelete={mockHandleConfirmDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Ні/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls handleConfirmDelete when the "Так" button is clicked', () => {
    render(
      <ConfirmDelete
        open={true}
        onClose={mockOnClose}
        handleConfirmDelete={mockHandleConfirmDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Так/i }));
    expect(mockHandleConfirmDelete).toHaveBeenCalledTimes(1);
  });
});
