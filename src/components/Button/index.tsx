import clsx from "clsx";
import { ComponentProps, FC } from "react";

type ButtonProps = ComponentProps<"button"> & {
  rounded?: boolean;
  full?: boolean;
};

const Button: FC<ButtonProps> = ({
  rounded,
  children,
  className,
  full,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "text-white text-lg h-14 md:hover:bg-blue-600 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed active:bg-blue-600 rounded-xl font-semibold max-w-170 px-4 justify-center items-center flex border border-blue-500 bg-blue-500",
        rounded ? "rounded-58" : "rounded-none",
        full ? "w-full" : "w-fit",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
