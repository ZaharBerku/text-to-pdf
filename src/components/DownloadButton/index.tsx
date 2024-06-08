import { Button } from "@components/index";
import { FC } from "react";

interface DownloadButtonProps {
  base64: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ base64 }) => {
  const handleDownload = () => {
    if (base64) {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_file.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  return <Button className="relative z-20" onClick={handleDownload}>Завантажити Файл</Button>;
};

export { DownloadButton };
