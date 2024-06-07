import { ComponentProps, FC, useEffect } from "react";
import { useAutoResizeTextArea } from "@hooks/index";
import clsx from "clsx";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label?: string;
  helperText?: string | null;
  classNameLabel?: string;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  helperText,
  value,
  classNameLabel,
  className,
  ...props
}) => {
  const textAreaRef = useAutoResizeTextArea([value]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current?.focus();
    }
  }, [textAreaRef.current]);

  return (
    <label
      className={clsx(
        "text-black font-semibold text-lg w-full relative bg-white border-blue-500 border rounded-lg",
        classNameLabel,
        { "border-red-600": helperText }
      )}
    >
      {label}
      <textarea
        value={value}
        ref={textAreaRef}
        className={clsx("rounded-lg", className)}
        {...props}
      />
      {helperText && (
        <span className="text-xs font-normal text-red-600 absolute top-full left-0">
          {helperText}
        </span>
      )}
    </label>
  );
};

export { TextArea };
