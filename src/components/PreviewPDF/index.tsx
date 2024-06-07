import PDFViewer from "pdf-viewer-reactjs";
import { FC, memo } from "react";

interface PreviewPDFProps {
  base64: string;
}

const PreviewPDF: FC<PreviewPDFProps> = memo(({ base64 }) => {
  return (
    <div>
      <PDFViewer
        key={base64}
        canvasCss="h-full max-w-96 w-full"
        document={{
          base64,
        }}
        hideNavbar
        scale={0.7}
      />
    </div>
  );
});

export { PreviewPDF };
