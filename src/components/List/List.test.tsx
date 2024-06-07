import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { List } from './index';
import { useHistoryState, useHistoryDispatch } from '@hooks/index';
import { HistoryItemType } from '@utils/types';

// Mock hooks
jest.mock('@hooks/index');

const mockUseHistoryState = useHistoryState as jest.Mock;
const mockUseHistoryDispatch = useHistoryDispatch as jest.Mock;

const mockSetSelectedHistory = jest.fn();

const mockHistoryList: HistoryItemType[] = [
  { id: 1, text: 'Item 1', file: 'file1.pdf' },
  { id: 2, text: 'Item 2', file: 'file2.pdf' },
];

describe('List component', () => {
  beforeEach(() => {
    mockUseHistoryState.mockReturnValue({
      selectedHistory: null,
    });
    mockUseHistoryDispatch.mockReturnValue({
      setSelectedHistory: mockSetSelectedHistory,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the list and items correctly', () => {
    render(<List list={mockHistoryList} onClose={jest.fn()} />);
    expect(screen.getByText('Створити новий файл')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('handles reset click and clears selected history', () => {
    render(<List list={mockHistoryList} onClose={jest.fn()} />);
    
    const resetElement = screen.getByText('Створити новий файл');
    fireEvent.click(resetElement);
    
    expect(mockSetSelectedHistory).toHaveBeenCalledWith(null);
  });
});
