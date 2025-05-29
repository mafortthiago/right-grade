import { FunctionComponent, useContext } from "react";
import { themeContext } from "../context/ThemeContext";
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
  const { theme } = useContext(themeContext);
  return (
    <input
      type="submit"
      className={`
        font-medium p-1 mb-1 rounded hover:brightness-95 cursor-pointer w-full ${
          isLoading ? "cursor-progress opacity-50" : ""
        }
        ${theme == "dark" ? "bg-first text-third" : "bg-second text-light-100"}
        `}
      disabled={isLoading}
      value={value}
      onClick={handleSubmit}
    />
  );
};

export default InputSubmit;
