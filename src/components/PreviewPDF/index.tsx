import PDFViewer from "pdf-viewer-reactjs";
import { FC, memo } from "react";
import { DownloadButton } from "@components/index";
interface PreviewPDFProps {
  base64: string;
}

const PreviewPDF: FC<PreviewPDFProps> = memo(({ base64 }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
      <div className="flex justify-center items-center max-h-96">
        <PDFViewer
          key={base64}
          canvasCss="h-full max-w-96 w-full flex justify-center items-center scale-50 md:scale-80"
          document={{
            base64,
          }}
          hideNavbar
        />
      </div>
      <DownloadButton base64={base64} />
    </div>
  );
});

export { PreviewPDF };
