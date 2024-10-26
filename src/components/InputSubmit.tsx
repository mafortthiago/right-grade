import { FunctionComponent, useState } from "react";
interface InputSubmitProps {
  value: string;
  handleSubmit: (e: any) => void;
  isLoading?: boolean;
}
const InputSubmit: FunctionComponent<InputSubmitProps> = ({
  value,
  handleSubmit,
  isLoading,
}) => {
  return (
    <input
      type="submit"
      className={
        "font-medium p-1 mb-3 rounded bg-second hover:brightness-95 cursor-pointer text-white " +
        (isLoading ? "cursor-progress opacity-50" : "")
      }
      disabled={isLoading}
      value={value}
      onClick={handleSubmit}
    />
  );
};

export default InputSubmit;
