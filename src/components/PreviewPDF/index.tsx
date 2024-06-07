import PDFViewer from "pdf-viewer-reactjs";
import { FC, memo } from "react";

interface PreviewPDFProps {
  base64: string;
}

const PreviewPDF: FC<PreviewPDFProps> = memo(({ base64 }) => {
  return (
    <div className="flex justify-center items-center">
      <PDFViewer
        key={base64}
        canvasCss="h-full max-w-96 w-full flex justify-center items-center scale-50 md:scale-90"
        document={{
          base64,
        }}
        hideNavbar
      />
    </div>
  );
});

export { PreviewPDF };
