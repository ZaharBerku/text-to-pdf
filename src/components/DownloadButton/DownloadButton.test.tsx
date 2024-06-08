import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DownloadButton } from './index';

describe('DownloadButton Component', () => {
  const base64String = "JVBERi0xLjUKJcfs...";

  test('renders the download button', () => {
    render(<DownloadButton base64={base64String} />);
    const button = screen.getByRole('button', { name: /Завантажити Файл/i });
    expect(button).toBeInTheDocument();
  });
});
