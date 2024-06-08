import { FC } from "react";
import { Button, Portal } from "@components/index";

interface ConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  handleConfirmDelete: () => void;
}

const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  open,
  onClose,
  handleConfirmDelete,
}) => {
  if (!open) {
    return null;
  }
  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black bg-opacity-45 z-30"
        onClick={onClose}
      ></div>
      <div className="max-w-96 bg-white p-5 rounded-lg flex flex-col gap-4 fixed z-40 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        <h3 className="text-black font-semibold text-lg">
          Ви впевнені, що хочете видалити?
        </h3>
        <div className="flex gap-2 w-full justify-center items-center">
          <Button className="h-8" onClick={onClose}>
            Ні
          </Button>
          <Button className="h-8" onClick={handleConfirmDelete}>
            Так
          </Button>
        </div>
      </div>
    </Portal>
  );
};

export { ConfirmDelete };
