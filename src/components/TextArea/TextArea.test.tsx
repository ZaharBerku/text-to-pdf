import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TextArea } from './index';
import { useAutoResizeTextArea } from '@hooks/index';

jest.mock('@hooks/index');
const mockUseAutoResizeTextArea = useAutoResizeTextArea as jest.Mock;

describe('TextArea component', () => {
  beforeEach(() => {
    mockUseAutoResizeTextArea.mockReturnValue({
      current: {
        focus: jest.fn(),
      },
    });
  });

  test('renders the component with label and helper text', () => {
    render(<TextArea label="Test Label" helperText="Helper text" value="Test value" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  test('focuses the textarea on mount', () => {
    render(<TextArea value="Test value" />);
    const textAreaElement = screen.getByDisplayValue('Test value');
    expect(textAreaElement).toHaveFocus();
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    render(<TextArea value="Test value" onChange={handleChange} />);
    const textAreaElement = screen.getByDisplayValue('Test value');
    fireEvent.change(textAreaElement, { target: { value: 'New value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('renders helper text with error styling if provided', () => {
    render(<TextArea value="Test value" helperText="Error text" />);
    const helperTextElement = screen.getByText('Error text');
    expect(helperTextElement).toHaveClass('text-red-600');
  });
});
