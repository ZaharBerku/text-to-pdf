import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PreviewPDF } from './index';

jest.mock('pdf-viewer-reactjs', () => (props: any) => (
  <div data-testid="pdf-viewer">{JSON.stringify(props.document)}</div>
));

describe('PreviewPDF component', () => {
  test('renders the PDFViewer with correct base64', () => {
    const base64String = 'dummyBase64String';

    render(<PreviewPDF base64={base64String} />);

    const pdfViewer = screen.getByTestId('pdf-viewer');
    expect(pdfViewer).toBeInTheDocument();
    expect(pdfViewer.textContent).toContain(base64String);
  });
});
