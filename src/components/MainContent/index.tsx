import { Dispatch, FC, FormEvent, useEffect, useState } from "react";
import { TextArea, PreviewPDF, Button } from "@components/index";
import { convertTextToPdf } from "@utils/api";
import { useHistoryState, useHistoryDispatch } from "@hooks/index";
import { HistoryItemType } from "@utils/types";
import { blobToBase64 } from "@utils/helpers";

interface MainContentProps {
  setLocalHistory: Dispatch<React.SetStateAction<HistoryItemType[] | null>>;
}

const MainContent: FC<MainContentProps> = ({ setLocalHistory }) => {
  const { setSelectedHistory } = useHistoryDispatch();
  const { selectedHistory } = useHistoryState();
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);
    if (!event.target.value.trim()) {
      setError("Поле не може бути порожнім");
    }
    setText(event.target.value);
  };

  const getItemData = (text: string, file: string): HistoryItemType => {
    const id = new Date();
    return {
      id: +id,
      text,
      file,
    };
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (!text.trim()) {
      setError("Поле не може бути порожнім");
      setIsLoading(false);
      return;
    }
    setError(null);
    try {
      const result = await convertTextToPdf(text);
      const base64 = await blobToBase64(result);
      setPreview(base64);
      const data = getItemData(text, base64);
      setLocalHistory((currentHistory) =>
        currentHistory ? [...currentHistory, data] : [data]
      );
      setSelectedHistory(data);
      setText("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Упс, щось пішло не так спробуйте ще раз)");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedHistory?.id) {
      setPreview(selectedHistory.file);
    } else {
      setPreview(null);
    }
  }, [selectedHistory?.id]);

  return (
    <main className="flex w-full max-h-screen flex-col h-screen justify-center items-center">
      {preview ? (
        <PreviewPDF base64={preview} />
      ) : (
        <form
          className="flex flex-col justify-center max-w-96 gap-8 w-full items-center border border-gray-400 shadow-lg rounded-lg p-6 m-auto"
          onSubmit={handleOnSubmit}
        >
          <TextArea
            className="resize-none min-h-20 w-full outline-none p-2"
            value={text}
            onChange={handleOnChange}
            helperText={error}
            placeholder="Введіть текст"
          />
          <Button disabled={isLoading} type="submit">
            Конвертувати в PDF
          </Button>
        </form>
      )}
    </main>
  );
};

export { MainContent };
