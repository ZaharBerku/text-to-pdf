import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Sidebar } from './index';
import { useHistoryState } from '@hooks/index';

jest.mock('@hooks/index');
jest.mock('@components/index', () => ({
  List: ({ list, onClose }: any) => (
    <ul>
      {list.map((item: any) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  ),
}));

const mockUseHistoryState = useHistoryState as jest.Mock;

describe('Sidebar component', () => {
  beforeEach(() => {
    mockUseHistoryState.mockReturnValue({
      history: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders history list when open and history is not empty', () => {
    const mockHistory = [
      { id: 1, text: 'Item 1', file: 'file1.pdf' },
      { id: 2, text: 'Item 2', file: 'file2.pdf' },
    ];
    mockUseHistoryState.mockReturnValue({
      history: mockHistory,
    });

    render(<Sidebar open={true} onClose={jest.fn()} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('renders message when history is empty', () => {
    render(<Sidebar open={true} onClose={jest.fn()} />);

    expect(screen.getByText(/Ви поки що не згенерували жодного PDF файла/i)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<Sidebar open={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when overlay is clicked', () => {
    const mockOnClose = jest.fn();
    render(<Sidebar open={true} onClose={mockOnClose} />);

    const overlay = screen.getByRole('button', { hidden: true });
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
