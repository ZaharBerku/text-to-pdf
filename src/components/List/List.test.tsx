import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './index';
import { HistoryItemType } from '@utils/types';

jest.mock('@hooks/index', () => ({
  useHistoryState: () => ({
    selectedHistory: { id: 1, text: 'Selected History Item', date: '2023-01-01' },
  }),
  useHistoryDispatch: () => ({
    setSelectedHistory: jest.fn(),
    deleteItemFromHistory: jest.fn(),
  }),
}));

// Mock ConfirmDelete component
jest.mock('@components/index', () => ({
  ConfirmDelete: ({ open, onClose, handleConfirmDelete }: any) => (
    open ? (
      <div data-testid="confirm-delete">
        <button onClick={handleConfirmDelete}>Confirm</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  ),
}));

describe('List Component', () => {
  const mockOnClose = jest.fn();
  const mockSetLocalHistory = jest.fn();
  const sampleHistory: HistoryItemType[] = [
    { id: 1, text: 'History Item 1', file: '' },
    { id: 2, text: 'History Item 2', file: '' },
  ];

  beforeEach(() => {
    mockOnClose.mockClear();
    mockSetLocalHistory.mockClear();
  });

  test('renders the list of history items', () => {
    render(
      <List
        list={sampleHistory}
        onClose={mockOnClose}
        setLocalHistory={mockSetLocalHistory}
      />
    );

    expect(screen.getByText('Створити новий файл')).toBeInTheDocument();
    expect(screen.getByText('History Item 1')).toBeInTheDocument();
    expect(screen.getByText('History Item 2')).toBeInTheDocument();
  });

  test('opens confirm delete modal when delete button is clicked', () => {
    render(
      <List
        list={sampleHistory}
        onClose={mockOnClose}
        setLocalHistory={mockSetLocalHistory}
      />
    );

    fireEvent.click(screen.getAllByRole('button')[1]); // Click delete button for the first item
    expect(screen.getByTestId('confirm-delete')).toBeInTheDocument();
  });

  test('calls onClose when a list item is clicked', () => {
    render(
      <List
        list={sampleHistory}
        onClose={mockOnClose}
        setLocalHistory={mockSetLocalHistory}
      />
    );

    fireEvent.click(screen.getByText('History Item 1'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('closes confirm delete modal', () => {
    render(
      <List
        list={sampleHistory}
        onClose={mockOnClose}
        setLocalHistory={mockSetLocalHistory}
      />
    );

    fireEvent.click(screen.getAllByRole('button')[1]); // Click delete button for the first item
    fireEvent.click(screen.getByText('Close')); // Close modal

    expect(screen.queryByTestId('confirm-delete')).not.toBeInTheDocument();
  });
});
