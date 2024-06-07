
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MainContent } from "./index";
import { convertTextToPdf } from "@utils/api";
import { useHistoryState, useHistoryDispatch } from "@hooks/index";

jest.mock("@utils/api");
jest.mock("@hooks/index");
jest.mock("@components/index", () => ({
  TextArea: ({ value, onChange, helperText }: any) => (
    <textarea value={value} onChange={onChange} placeholder="Введіть текст" />
  ),
  PreviewPDF: ({ base64 }: any) => <div>PDF Preview</div>,
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

const mockConvertTextToPdf = convertTextToPdf as jest.Mock;
const mockUseHistoryState = useHistoryState as jest.Mock;
const mockUseHistoryDispatch = useHistoryDispatch as jest.Mock;

describe("MainContent component", () => {
  beforeEach(() => {
    mockUseHistoryState.mockReturnValue({
      selectedHistory: null,
    });
    mockUseHistoryDispatch.mockReturnValue({
      setSelectedHistory: jest.fn(),
    });
  });

  test("renders the component correctly", () => {
    render(<MainContent setLocalHistory={jest.fn()} />);
    expect(screen.getByPlaceholderText(/введіть текст/i)).toBeInTheDocument();
    expect(screen.getByText(/конвертувати в pdf/i)).toBeInTheDocument();
  });

  test("submits the form and handles successful conversion", async () => {
    const mockSetLocalHistory = jest.fn();
    mockConvertTextToPdf.mockResolvedValueOnce(
      new Blob(["PDF content"], { type: "application/pdf" })
    );

    render(<MainContent setLocalHistory={mockSetLocalHistory} />);

    const textArea = screen.getByPlaceholderText(/введіть текст/i);
    const submitButton = screen.getByText(/конвертувати в pdf/i);

    fireEvent.change(textArea, { target: { value: "Some text" } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockConvertTextToPdf).toHaveBeenCalledWith("Some text")
    );
    await waitFor(() => expect(mockSetLocalHistory).toHaveBeenCalled());

    // Перевірка, що текстове поле більше не відображається
    expect(screen.queryByPlaceholderText(/введіть текст/i)).toBeNull();
    // Перевірка, що рендериться компонент PreviewPDF
    expect(screen.getByText("PDF Preview")).toBeInTheDocument();
  });
});
